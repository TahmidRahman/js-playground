function binaryGap(binaryString) {
  const binaryGapRegExp = /[0]+1/g;
  const matches = [];
  let singleMatch;
  while ((singleMatch = binaryGapRegExp.exec(binaryString))) {
    if (singleMatch.index !== 0) {
      matches.push(singleMatch[0]);
    }
  }

  return matches.reduce((maxLength, binaryGapMatch) => {
    const gap = binaryGapMatch.length - 1;
    return gap > maxLength ? gap : maxLength;
  }, 0);
}

function solution(N) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (N >= 1 && N <= 2147483647) {
    return binaryGap(N.toString(2));
  }
}
