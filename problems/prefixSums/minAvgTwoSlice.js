function solution(A) {
  const { length: n } = A;
  let minAvg = Infinity;
  let foundIndex = -1;
  for (let i = 0; i < n - 1; i++) {
    const avg = (A[i] + A[i + 1]) / 2;
    if (avg < minAvg) {
      minAvg = avg;
      foundIndex = i;
    }
  }
  for (let i = 0; i < n - 2; i++) {
    const avg = (A[i] + A[i + 1] + A[i + 2]) / 3;
    if (avg < minAvg) {
      minAvg = avg;
      foundIndex = i;
    }
  }

  return foundIndex;
}

console.log(solution([4, 2, 2, 5, 1, 5, 8])); // Should return 1
