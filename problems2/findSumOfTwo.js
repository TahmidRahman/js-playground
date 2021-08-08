let find_sum_of_two = function (A, val) {
  let visited = [];
  let output = false;
  A.forEach((item) => {
    if (visited.includes(val - item)) {
      output = true;
    }
    visited.push(item);
  });

  return output;
};
