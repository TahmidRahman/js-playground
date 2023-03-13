var isSameDiff = (arr) => {
  var n = arr.length - 1;
  var res = arr[n] - arr[n - 1] == arr[n - 1] - arr[n - 2];
  return res;
};
var numberOfArithmeticSlices = function (nums) {
  let count = 0;
  let iA, j;
  if (nums.length < 3) return count;
  for (let i = 0; i < nums.length - 2; i++) {
    iA = [nums[i], nums[i + 1], nums[i + 2]];
    if (isSameDiff(iA)) {
      count++;
      j = i + 3;
      while (j < nums.length) {
        iA.push(nums[j++]);
        if (isSameDiff(iA)) count++;
        else break;
      }
    }
  }
  return count;
};

var input_n = Number(process.argv[2]);
var result = numberOfArithmeticSlices(input_n);
console.log(result);
