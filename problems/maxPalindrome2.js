const { expect } = require('./test');

function highestValuePalindrome(s, n, k) {
  const arr = s.split('');
  let minChanges = 0;
  for (let i = 0, j = n - 1; i < j; i++, j--) {
    if (arr[i] != arr[j]) {
      minChanges++;
    }
  }
  if (minChanges > k) {
    return '-1';
  }
  let changeBoth = k - minChanges;
  let i = 0;
  let j = n - 1;
  for (; i <= j; i++, j--) {
    if (arr[i] != arr[j]) {
      const max = Math.max(arr[i], arr[j]);
      if (max != '9' && changeBoth >= 1) {
        arr[i] = '9';
        arr[j] = '9';
        changeBoth--;
      } else {
        arr[i] = max;
        arr[j] = max;
        minChanges--;
      }
    } else {
      const max = Math.max(arr[i], arr[j]);
      if (max != '9' && changeBoth >= 2) {
        arr[i] = '9';
        arr[j] = '9';
        changeBoth -= 2;
      }
    }
  }

  if (changeBoth && i - 1 == j + 1) {
    arr[i - 1] = '9';
  }

  return arr.join('');
}

expect(highestValuePalindrome('3943', 4, 1)).toBe('3993');
expect(highestValuePalindrome('092282', 6, 3)).toBe('992299');
expect(highestValuePalindrome('0011', 4, 1)).toBe('-1');
expect(highestValuePalindrome('5', 1, 1)).toBe('9');
expect(highestValuePalindrome('12321', 5, 1)).toBe('12921');
expect(highestValuePalindrome('128392759430124', 15, 8)).toBe(
  '929394959493929'
);
