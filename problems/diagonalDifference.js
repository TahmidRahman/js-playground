function diagonalDifference(arr) {
  // Write your code here
  const length = arr.length;
  let primaryDiagonalSum = 0;
  let secondaryDiagonalSum = 0;
  let diagonalDrive = 0;
  for (let cursor = 0; cursor < length; cursor++) {
    primaryDiagonalSum += arr[cursor][diagonalDrive];
    secondaryDiagonalSum += arr[cursor][arr.length - 1 - diagonalDrive];
    diagonalDrive++;
    console.log(primaryDiagonalSum, secondaryDiagonalSum);
  }

  return Math.abs(primaryDiagonalSum - secondaryDiagonalSum);
}

const input = [
  [1, 2],
  [3, 5]
];

console.log(diagonalDifference(input));
