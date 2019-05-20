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
console.log(someModule(3));
