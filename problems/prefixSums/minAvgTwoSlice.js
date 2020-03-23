function prefixSum(A) {
  const prefixSumResult = [0];
  A.forEach((item, index) => {
    prefixSumResult.push(item + prefixSumResult[index]);
  });

  return prefixSumResult;
}

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let minAvg = Infinity;
  let startingIndex = 0;
  const { length: n } = A;
  const sums = prefixSum(A);
  for (let i = 2; i <= n; i++) {
    const avg = (sums[i] - sums[i - 2]) / 2;
    if (avg < minAvg) {
      minAvg = avg;
      startingIndex = i - 2;
    }
  }

  for (let i = 3; i <= n; i++) {
    const avg = (sums[i] - sums[i - 3]) / 3;
    if (avg < minAvg) {
      minAvg = avg;
      startingIndex = i - 3;
    }
  }

  return startingIndex;
}

console.log(solution([4, 2, 2, 5, 1, 5, 8])); // Should return 1
