function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  const n = A.length;
  let permArray = [];
  let countArray = [];
  for (let i = 1; i <= n; i++) {
    permArray[i] = 1;
  }

  for (let each of A) {
    if (!countArray[each]) {
      countArray[each] = 1;
    } else {
      countArray[each]++;
    }

    if (countArray[each] != permArray[each]) {
      return 0;
    }
  }

  return 1;
}

console.log([1, 4, 2, 3]); // should return 1
console.log([1, 1]); // should return 0
