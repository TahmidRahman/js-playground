// given sequence of natural numbers, find the missing number
function findMissing(numArr) {
  const actualLength = numArr.length + 1;
  const expectedTotal = ((actualLength + 1) * actualLength) / 2;
  const givenTotal = numArr.reduce((total, n) => (total += n), 0);
  return expectedTotal - givenTotal;
}

const { expect } = require('../problems/test');
expect(findMissing([3, 7, 1, 2, 8, 4, 5])).toBe(6);
