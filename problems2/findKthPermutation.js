let factorial = function (n) {
  if (n == 0 || n === 1) {
    return 1;
  } else {
    return n * (n - 1);
  }
};

let find_kth_permutation = function (v, k, result) {
  //TODO: Write - Your - Code
  if (!v || v.length === 0) {
    return;
  }
  let n = v.length;
  let count = factorial(n - 1);
  // to determine which block k lies in // TODO: Need to understand the theory
  let select = Math.floor((k - 1) / count);
  result[0] += '' + v[select];
  v.splice(select, 1);
  k -= count * select;
  find_kth_permutation(v, k, result);
};
