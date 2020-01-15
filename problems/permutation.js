function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  const { length: N } = A;
  if (N >= 1 && N <= 100000) {
    const total = A.reduce((sum, num) => (sum += num), 0);
    const totalInTheory = (N * (N + 1)) / 2;

    return total == totalInTheory ? 1 : 0;
  }

  return 0;
}

console.log(solution([4, 1, 3, 2]));
