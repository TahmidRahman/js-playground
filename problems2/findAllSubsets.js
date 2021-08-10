let get_bit = function (num, shift) {
  let temp = 1 << shift;
  if (num & (temp == 0)) {
    return 0;
  }
  return 1;
};

let get_all_subsets = function (v, sets) {
  //TODO: Write - Your - Code
  let subset_count = 2 ** v.length;
  for (let i = 0; i < subset_count; i++) {
    let subset = new Set([]);
    for (let j = 0; j < v.length; j++) {
      if (get_bit(i, j)) {
        subset.add(v[j]);
      }
    }
    sets.push(subset);
  }
};
