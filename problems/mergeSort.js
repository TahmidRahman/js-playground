function mergeSort(inputArray) {
  const { length } = inputArray;
  if (length === 1) {
    return inputArray;
  } else {
    const arrayA = mergeSort(inputArray.slice(0, Math.floor(length / 2)));
    const arrayB = mergeSort(inputArray.slice(Math.floor(length / 2)));

    return merge(arrayA, arrayB);
  }
}

function merge(arrayA, arrayB) {
  const sortedArray = [];

  while (arrayA.length > 0 && arrayB.length > 0) {
    if (arrayA[0] > arrayB[0]) {
      sortedArray.push(arrayB.shift());
    } else if (arrayB[0] > arrayA[0]) {
      sortedArray.push(arrayA.shift());
    }
  }

  while (arrayA.length > 0) {
    sortedArray.push(arrayA.shift());
  }

  while (arrayB.length > 0) {
    sortedArray.push(arrayB.shift());
  }

  return sortedArray;
}

console.log(mergeSort([3, 4, 1, 6, 8, 24, 2, 5]));
