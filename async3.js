// Generator

function* powers(n) {
  for (let current = n; ; current *= n) {
    yield current;
  }
}

for (let power of powers(3)) {
  if (power > 100) {
    break;
  }
  console.log(power);
}

let power;
const powersIterator = powers(3);
while ((power = powersIterator.next())) {
  if (power.value > 100) {
    break;
  }
  console.log('while', power.value);
}

// try {
//   setTimeout(() => {
//     throw new Error('some error!');
//   }, 20);
// } catch (e) {
//   console.log('Error caught!');
// }

let start = Date.now();
setTimeout(() => {
  console.log('Timeout ran at', Date.now() - start);
}, 20);
while (Date.now() < start + 50) {}
console.log('Wasted time until', Date.now() - start);

Promise.resolve('Done').then(console.log);
console.log('Me first!');

// Exercise 2

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    const resolvedValues = [];
    let pending = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((value) => {
        resolvedValues[i] = value;
        pending--;
        if (pending == 0) resolve(resolvedValues);
      }, reject);
    }

    if (promises.length == 0) {
      resolve(resolvedValues);
    }
  });
}

Promise_all([
  Promise.resolve(4),
  Promise.reject(new Error('boom')),
  Promise.resolve(6),
])
  .then((value) => console.log('resolved value from duplicate', value))
  .catch((error) => console.log('rejected value from duplicate', error));

Promise.all([
  Promise.resolve(4),
  Promise.reject(new Error('boom')),
  Promise.resolve(6),
])
  .then((value) => console.log('resolved value from original', value))
  .catch((error) => console.log('rejected value from original', error));

Promise_all([Promise.resolve(4), Promise.resolve(5), Promise.resolve(6)])
  .then((value) => console.log('resolved value from duplicate', value))
  .catch((error) => console.log('rejected value from duplicate', error));
