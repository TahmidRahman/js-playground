function countInversions(arr) {
  const [_, count] = mergeSort(arr);
  return count;
}
function mergeSort(inputArray) {
  let count = 0;
  const { length } = inputArray;
  if (length === 1) {
    return [inputArray, 0];
  } else {
    const [arrayA, countA] = mergeSort(
      inputArray.slice(0, Math.floor(length / 2))
    );
    const [arrayB, countB] = mergeSort(
      inputArray.slice(Math.floor(length / 2))
    );

    return merge(arrayA, arrayB, countA + countB);
  }
}

function merge(arrayA, arrayB, count) {
  const sortedArray = [];
  let i = 0;
  let mid = arrayA.length;
  let j = 0;

  while (i < arrayA.length && j < arrayB.length) {
    if (arrayA[i] > arrayB[j]) {
      count += mid - i;
      sortedArray.push(arrayB[j++]);
    } else if (arrayB[j] >= arrayA[i]) {
      sortedArray.push(arrayA[i++]);
    }
  }

  while (i < arrayA.length) {
    sortedArray.push(arrayA[i++]);
  }

  while (j < arrayB.length) {
    sortedArray.push(arrayB[j++]);
  }

  return [sortedArray, count];
}

console.log(countInversions([7, 5, 3, 1]));
