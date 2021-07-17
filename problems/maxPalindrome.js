const { expect } = require('./test');

function highestValuePalindrome(s, n, k) {
  const arr = s.split('');
  const fixes = [];
  const limit = n % 2 == 0 ? n / 2 - 1 : Math.floor(n / 2) - 1;

  for (let i = 0; i <= limit; i++) {
    const left = arr[i];
    const right = arr[n - 1 - i];

    if (left != right) {
      if (k > 0) {
        const max = Math.max(left, right);
        arr[i] = max;
        arr[n - 1 - i] = max;
        fixes.push(i);
        k--;
      } else return '-1';
    }
  }

  if (k > 0) {
    for (let j = 0; j <= limit; j++) {
      const left = arr[j];
      const right = arr[n - 1 - j];

      if (k <= 0) break;

      if (left != '9' && right != '9') {
        if (fixes.includes(j) && k >= 1) {
          arr[j] = '9';
          arr[n - 1 - j] = '9';
          k--;
        }

        if (k > 1) {
          arr[j] = '9';
          arr[n - 1 - j] = '9';
          k -= 2;
        }
      }
    }
  }

  if (k > 0 && n % 2) {
    arr[Math.floor(n / 2)] = '9';
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
