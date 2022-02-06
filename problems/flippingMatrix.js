/* Unsolved */

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'flippingMatrix' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */

function processColumn(matrix, index) {
  let prior = 0;
  let later = 0;
  for (let i = 0; i < matrix.length / 2; i++) {
    prior += matrix[i][index];
    later += matrix[matrix.length - i][index];
  }

  if (prior > later) {
    for (let i = 0; i < matrix.length / 2; i++) {
      let temp = matrix[i][index];
      matrix[i][index] = matrix[matrix.length - i][index];
      matrix[matrix.length - i][index] = temp;
    }
  }
}

function processRow(matrix, index) {
  let prior = 0;
  let later = 0;
  for (let i = 0; i < matrix.length / 2; i++) {
    prior += matrix[index][i];
    later += matrix[index][matrix.length - i];
  }

  if (prior > later) {
    for (let i = 0; i < matrix.length / 2; i++) {
      let temp = matrix[index][i];
      matrix[index][i] = matrix[index][matrix.length - i];
      matrix[index][matrix.length - i] = temp;
    }
  }
}

function getSum(matrix) {
  let total = 0;
  for (let i = 0; i < matrix.length / 2; i++) {
    for (let j = 0; j < matrix.length / 2; j++) {
      total += matrix[i][j];
    }
  }
  return total;
}

function flippingMatrix(matrix) {
  // Write your code here
  for (let i = 0; i < matrix.length; i++) {
    processColumn(matrix, i);
  }
  for (let i = 0; i < matrix.length; i++) {
    processRow(matrix, i);
  }
  return getSum(matrix);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const n = parseInt(readLine().trim(), 10);

    let matrix = Array(2 * n);

    for (let i = 0; i < 2 * n; i++) {
      matrix[i] = readLine()
        .replace(/\s+$/g, '')
        .split(' ')
        .map((matrixTemp) => parseInt(matrixTemp, 10));
    }

    const result = flippingMatrix(matrix);

    ws.write(result + '\n');
  }

  ws.end();
}
