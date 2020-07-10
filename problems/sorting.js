const givenArray = [
  5,
  4,
  3,
  2,
  8,
  9,
  13,
  15,
  1,
  7,
  10,
  11,
  6,
  14,
  12,
  12,
  12,
  11,
];
const expectedArray = Array.from(givenArray).sort((a, b) => a - b);

const { expect } = require('./test');

function quickSort(arr) {
  function sort(A, lo, hi) {
    if (lo < hi) {
      let p = partition(A, lo, hi);
      sort(A, lo, p - 1);
      sort(A, p + 1, hi);
    }
  }

  function swap(A, p1, p2) {
    let temp = A[p1];
    A[p1] = A[p2];
    A[p2] = temp;
  }

  function partition(A, lo, hi) {
    let pivot = A[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      if (A[j] < pivot) {
        i += 1;
        swap(A, i, j);
      }
    }

    swap(A, i + 1, hi);
    return i + 1;
  }

  sort(arr, 0, arr.length - 1);
  return arr;
}

function countingSort(arr, k = 100) {
  let count = [];

  while (k--) {
    count.push(0);
  }

  for (let i = 0; i < arr.length; i++) {
    ++count[arr[i]];
  }

  for (let i = 1; i < arr.length; i++) {
    count[i] += count[i - 1];
  }

  let output = [];
  for (let i = 0; i < arr.length; i++) {
    output[count[arr[i]]] = arr[i];
    --count[arr[i]];
  }

  return output.filter(Boolean);
}

// const sortedArray = quickSort(givenArray);
const sortedArray = countingSort(givenArray);

expect(sortedArray).toBeInSameOrder(expectedArray);
