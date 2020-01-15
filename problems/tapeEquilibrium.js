function withinRange(n, LOW = 2, HIGH = 100000) {
  if (n >= LOW && n <= HIGH) {
    return true;
  }

  return false;
}

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  const { length: n } = A;
  let min = Infinity;

  if (withinRange(n)) {
    const sum = A.reduce((total, num) => (total += num), 0);

    let cumulativeTotal = 0;

    A.forEach(num => {
      cumulativeTotal += num;
      let innerDifference = Math.abs(sum - 2 * cumulativeTotal);

      if (innerDifference < min) {
        min = innerDifference;
      }
    });
  }

  return min;
}

console.log(solution([3, 1]));
