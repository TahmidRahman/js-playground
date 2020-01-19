function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  const n = A.length;
  const permArray = [];
  const countArray = [];
  for (let i = 1; i <= n; i++) {
    permArray[i] = 1;
  }

  for (let each of A) {
    if (each >= 0) {
      if (!countArray[each]) {
        countArray[each] = 1;
      } else {
        countArray[each]++;
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    if (!countArray[i] && permArray[i]) {
      return i;
    }
  }

  return n + 1;
}

console.log(solution([1, 3, 6, 4, 1, 2])); //should return 5
