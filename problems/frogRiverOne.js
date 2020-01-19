function solution(X, A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let expectedTotal = 0;
  let positionTracked = [];
  let positionTotal = 0;
  let timeTracked = 0;
  for (let i = 1; i <= X; i++) {
    expectedTotal += i;
  }

  for (let each of A) {
    if (!positionTracked[each - 1]) {
      positionTracked[each - 1] = 1;
      positionTotal += each;
    }

    if (positionTotal === expectedTotal) {
      return timeTracked;
    }

    timeTracked++;
  }

  return -1;
}

console.log(solution(5, [1, 3, 1, 4, 2, 3, 5, 4]));
// Expected 6
