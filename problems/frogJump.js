function withinRange(variable, low = 1, high = 1000000000) {
  return variable >= low && variable <= high;
}

function solution(X, Y, D) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (withinRange(X) && withinRange(Y) && withinRange(D)) {
    return Math.ceil((Y - X) / D);
  }
}
