function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  const { length: n } = A;
  let eastGoingCars = 0;
  const prefixSums = [0];
  let count = 0;

  for (let i = 0; i < n; i++) {
    prefixSums[i + 1] = prefixSums[i] + A[i];
  }

  for (let i = 0; i < n; i++) {
    if (A[i] == 0) {
      eastGoingCars++;
    }

    if (prefixSums[i + 1] > prefixSums[i]) {
      count += eastGoingCars;
    }
  }

  return count <= 1000000000 ? count : -1;
}

console.log(solution([0, 1, 0, 1, 1])); // Shoud return 5
