function getMinimumUniqueSum(arr) {
  // Write your code here
  let count = {};
  arr.forEach(item => {
    if (count[item]) {
      count[item]++;
    } else {
      count[item] = 1;
    }
  });

  const result = Object.entries(count).reduce((sum, [item, n]) => {
    const number = (n / 2) * (item * 2 + n - 1);

    return (sum += number);
  }, 0);
  return result;
}

console.log(getMinimumUniqueSum([1, 2, 2]));
