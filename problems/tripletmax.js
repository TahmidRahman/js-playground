function merge(a, b) {
  let output = [];
  while (a.length && b.length) {
    if (a[0] <= b[0]) {
      output.push(a.shift());
    } else {
      output.push(b.shift());
    }
  }
  while (a.length) {
    output.push(a.shift());
  }
  while (b.length) {
    output.push(b.shift());
  }
  return output;
}
function mergeSort(arr) {
  if (arr.length == 1) {
    return arr;
  } else {
    const partA = mergeSort(arr.slice(0, Math.floor(arr.length / 2)));
    const partB = mergeSort(arr.slice(Math.floor(arr.length / 2)));
    return merge(partA, partB);
  }
}
function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  const sorted = mergeSort(A);
  const positiveMax =
    sorted[sorted.length - 1] *
    sorted[sorted.length - 2] *
    sorted[sorted.length - 3];
  const negativeMax = sorted[0] * sorted[1] * sorted[sorted.length - 1];
  return positiveMax > negativeMax ? positiveMax : negativeMax;
}

const test1 = [-10, -2, -4];
console.log(solution(test1));
