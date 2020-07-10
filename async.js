// Simple promise by Promise.resolve

let somePromiseValue = Promise.resolve(5);
// somePromiseValue.then(value => console.log(`Resolved value ${value}`));

// Promise constructor
// const somePromise = new Promise((_, reject) => reject(new Error('fail')))
//   .then(value => console.log(`Handler 1 ${value}`))
//   .catch(error => {
//     console.log(`Caught rejection ${error}`);
//     return 'something';
//   })
//   .then(value => console.log(`Handler 2 ${value}`));
function powerOf(number, baseNumber) {
  let power = 0;

  while (number != 1) {
    number /= baseNumber;
    power++;
  }
  return power;
}

console.log(powerOf(126, 5));
