function plusMinus(arr) {
  const total = arr.reduce(
    ({ plus, minus, zero }, item) => {
      item > 0 ? plus++ : item < 0 ? minus++ : zero++;
      return { plus, minus, zero };
    },
    {
      plus: 0,
      minus: 0,
      zero: 0
    }
  );
  const result = Object.values(total).map(val => val / arr.length);
  const resultOutput = result.reduce(
    (res, item, index, ar) => res + item + "\n",
    ""
  );
  // process.stdout.write(resultOutput)
}

console.log(plusMinus([1, 3, -1, 0, -4]));
