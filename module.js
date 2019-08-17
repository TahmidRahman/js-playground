// Improvised module

const weekDay = (function() {
  const names = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  return {
    name(number) {
      return names[number];
    },
    number(name) {
      return names.indexOf(name);
    }
  };
})();

// console.log(weekDay.name(weekDay.number('Tuesday')));

// Evaluating string as code

let x = 1;

function evalCodeReturnX(code) {
  eval(code);
  return x;
}

// console.log(evalCodeReturnX('var x = 2;'));
// console.log(x);

// Using function constructor to have a separate 'module' scope

let someModule = Function('x', 'return x*2;');
// console.log(someModule(3));

// const { formatDate } = require('./date-formatting');
const fs = require('fs');

require.cache = Object.create(null);
const myRequire = function(moduleName) {
  if (!(moduleName in require.cache)) {
    let code = fs.readFileSync(moduleName, 'utf8'); // For Node ENV
    let module = { exports: {} };
    require.cache[moduleName] = module;
    let wrapper = Function('require, exports, module', code);
    wrapper(require, module.exports, module);
  }
  return require.cache[moduleName].exports;
};

const formatDate = myRequire('./date-formatting.js'); // default import

// console.log(formatDate(new Date(2017, 9, 13), 'dddd the Do'));

const { parse } = require('ini');
console.log(parse('x=10\ny=10'));
