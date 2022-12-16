/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  try {
    if (n > 10) {
      var divider = 10;
      while (n / divider >= 10) {
        divider *= 10;
      }
      var new_n = 0;
      while (n > 10) {
        new_n += Math.pow(Math.floor(n / divider), 2);
        n %= divider;
        divider /= 10;
      }
      new_n += Math.pow(n, 2);
      return isHappy(new_n);
    } else if (n == 1 || n == 7 || n == 10) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    if (e.name == 'RangeError') {
      return false;
    }
  }
};

var input_n = Number(process.argv[2]);
var result = isHappy(input_n);
console.log(result);
