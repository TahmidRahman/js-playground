// DP
function coinChangeProblem(n, c) {
  // Write your code here
  let solution = [];
  for (let i = 0; i < n + 1; i++) {
    solution[i] = 0;
  }
  solution[0] = 1;
  for (let j = 0; j < c.length; j++) {
    for (let k = c[j]; k < n + 1; k++) {
      solution[k] += solution[k - c[j]];
    }
  }
  return solution[solution.length - 1];
}
