var nthUglyNumber = function (n) {
  const uglies = [1];
  let i2 = 0;
  let i3 = 0;
  // let i5 = 0;
  while (uglies.length < n) {
    // let next = Math.min(uglies[i2] * 2, uglies[i3] * 3, uglies[i5] * 5);
    let next = Math.min(uglies[i2] * 2, uglies[i3] * 3);
    if (next == uglies[i2] * 2) {
      i2 += 1;
    }
    if (next == uglies[i3] * 3) {
      i3 += 1;
    }
    // if (next == uglies[i5] * 5) {
    //   i5 += 1;
    // }
    uglies.push(next);
  }
  return uglies;
};

var input_n = Number(process.argv[2]);
var result = nthUglyNumber(input_n);
console.log(result);
