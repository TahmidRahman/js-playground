function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if ((match = /^"([^"]*)"/.exec(program))) {
    expr = { type: 'value', value: match[1] };
  } else if ((match = /^\d+\b/.exec(program))) {
    expr = { type: 'value', value: Number(match[0]) };
  } else if ((match = /^[^\s(),#]+/.exec(program))) {
    expr = { type: 'word', name: match[0] };
  } else {
    throw new SyntaxError('Unexpected syntax ' + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
  let skippable = string.match(/^(\s|#.*)*/);
  return string.slice(skippable[0].length);
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != '(') {
    return { expr: expr, rest: program };
  }
  program = skipSpace(program.slice(1));
  expr = { type: 'apply', operator: expr, args: [] };

  while (program[0] != ')') {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ',') {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ')') {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}

function parse(program) {
  let { expr, rest } = parseExpression(program);

  if (skipSpace(rest).length > 0) {
    throw new SyntaxError('Unexpected text after program!');
  }

  return expr;
}

const specialForms = Object.create(null);

function evaluate(expr, scope) {
  if (expr.type == 'value') {
    return expr.value;
  } else if (expr.type == 'word') {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding ${expr.name}`);
    }
  } else if (expr.type == 'apply') {
    let { operator, args } = expr;
    if (operator.type == 'word' && operator.name in specialForms) {
      return specialForms[operator.name](args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == 'function') {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError('Applying a non-function');
      }
    }
  }
}

specialForms.if = (args, scope) => {
  if (args.length !== 3) {
    throw new SyntaxError('Wrong number of args to if');
  }
  if (evaluate(args[0], scope) != false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args, scope) => {
  if (args.length !== 2) {
    throw new SyntaxError('Wrong number of args to while');
  }
  while (evaluate(args[0], scope) != false) {
    evaluate(args[1], scope);
  }

  return false; // Like undefined in javascript
};

specialForms.do = (args, scope) => {
  let value = false;
  for (let each of args) {
    value = evaluate(each, scope);
  }
  return value;
};

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != 'word') {
    throw new SyntaxError('Invalid call of define');
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

specialForms.set = (args, env) => {
  if (args.length != 2 || args[0].type != 'word') {
    throw new SyntaxError('Invalid call of set');
  }

  let name = args[0].name;
  let value = evaluate(args[1], env);
  if (!(name in env)) {
    throw new ReferenceError(`${name} is not defined`);
  }
  let scope = env;
  while (!Object.prototype.hasOwnProperty.call(scope, name)) {
    scope = Object.getPrototypeOf(scope);
  }

  scope[name] = value;
  return value;
};

specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError('Funciton must have a body');
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type != 'word') {
      throw new SyntaxError('Parameter names must be words');
    }
    return expr.name;
  });
  return function () {
    if (params.length != arguments.length) {
      throw new TypeError('Wrong numbers of arguments');
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
  };
};

let topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ['+', '-', '*', '/', '>', '==', '<']) {
  topScope[op] = new Function('a', 'b', `return a ${op} b`);
}

topScope.print = (value) => {
  console.log(value);
  return value;
};

topScope.array = (...values) => {
  return values;
};

topScope.length = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError(`Not a valid array`);
  }

  return array.length;
};

topScope.element = (array, n) => {
  if (!Array.isArray(array)) {
    throw new TypeError(`Not a valid array`);
  }

  return array[n] || false;
};

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

run(`
  do(
    define(total,0),
    define(count,1),
    while(<(count,11),
      do(
        define(total,+(total,count)),
        define(count,+(count,1))
      )
    ),
    print(total)
  )
`);

run(`
  do(
    define(plusOne,fun(a,+(a,1))),
    print(plusOne(5))
  )
`);

run(`
  do(
    define(pow,fun(base,exp,
        if(==(exp,0),
          1,
          *(base,pow(base,-(exp,1))))       
      )),
    print(pow(2,10))
  )
`);

run(`
  do(
    define(arr,array(1,2,3)),
    print(length(arr)),
    print(element(arr,0))
  )
`);

run(`
  do(
    define(f,fun(a,fun(b,+(a,b)))),
    print(f(4)(5))
  )
`);

run(`
  do(
    define(a,10),
    define(f,fun(
      do(
        define(a,5),
        set(a,+(a,1)),
        +(a,5)
      )
      )),
    print("Should return 11"),
    print(f())
  )
`);

run(`
  # comment test
  do(
    define(a,10),
    define(f,fun(
      do(
        set(a,+(a,1)),
        +(a,5)
      )
      )),
    print("Should return 16"),
    print(f())
  )
`);
