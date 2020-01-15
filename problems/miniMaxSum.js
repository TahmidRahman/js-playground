function miniMaxSum(arr) {
  const total = arr.reduce((sum, item) => (sum += item), 0);

  const max = Math.max(...arr);
  const min = Math.min(...arr);

  return `${total - max} ${total - min}`;
}

console.log(miniMaxSum([1, 2, 3, 4, 5]));
