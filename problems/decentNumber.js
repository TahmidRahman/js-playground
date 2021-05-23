function constructDecentNumber(n3, n5) {
  return '5'.repeat(n3).concat('3'.repeat(n5));
}

function decentNumber(n) {
  // Write your code here
  let result = '';
  let n3 = 0;
  let n5 = 0;

  if (n >= 3) {
    let n3tmp = n - (n % 3);
    if (n >= 5) {
      let n5tmp = n % 3;
      while (n3tmp >= 0) {
        if (n5tmp % 5 == 0 && n3tmp % 3 == 0) {
          n5 = n5tmp;
          n3 = n3tmp;
          break;
        } else {
          n5tmp++;
          n3tmp--;
        }
      }
    } else if (n == 3) {
      n3 = n3tmp;
    }
  }

  result = constructDecentNumber(n3, n5);
  return result || -1;
}

const { expect } = require('./test');

const expected = [
  -1,
  -1,
  555,
  -1,
  33333,
  555555,
  -1,
  55533333,
  555555555,
  3333333333
];
for (let i = 1; i <= 10; i++) {
  expect(decentNumber(i)).toBe(expected[i - 1]);
}
