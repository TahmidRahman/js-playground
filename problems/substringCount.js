function substrCount(n, s) {
  let total = 0;
  let countSequence = 0;
  let prev = '';
  let v = '';
  let j;

  for (let i = 0; i < s.length; i++) {
    ++countSequence;
    v = s[i];
    if (i && prev != v) {
      j = 1;
      while (i - j >= 0 && i + j < s.length && j <= countSequence) {
        if (s[i - j] && s[i - j] == prev && prev == s[i + j]) {
          total++;
          j++;
        } else break;
      }
      countSequence = 1;
    }
    total += countSequence;
    prev = v;
  }
  return total;
}

const { expect } = require('./test');

expect(substrCount(7, 'abcbaba')).toBe(10);
expect(substrCount(4, 'aaaa')).toBe(10);
expect(substrCount(5, 'asasd')).toBe(7);
