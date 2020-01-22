function solution(N, A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let counters = [];
  let addedMaxCount = 0;
  let maxCount = 0;

  for (let i = 0; i <= N; i++) {
    counters.push(0);
  }

  let previousCount = 0;
  for (let each of A) {
    previousCount =
      counters[each] < addedMaxCount ? addedMaxCount : counters[each];
    if (each >= 1 && each <= N) {
      counters[each] = previousCount + 1;
    } else {
      addedMaxCount = maxCount;
    }

    if (counters[each] > maxCount) {
      maxCount = counters[each];
    }
  }

  return counters
    .map(count => (count < addedMaxCount ? addedMaxCount : count))
    .slice(1);
}

console.log(solution(5, [3, 4, 4, 6, 1, 4, 4]));
// Output: [ 3, 2, 2, 4, 2 ]
