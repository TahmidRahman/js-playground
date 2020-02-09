function minimalFactorInSequence(seq) {
  if (seq.includes('A')) {
    return 1;
  } else if (seq.includes('C')) {
    return 2;
  } else if (seq.includes('G')) {
    return 3;
  } else if (seq.includes('T')) {
    return 4;
  }

  return factors;
}

function solution(S, P, Q) {
  // write your code in JavaScript (Node.js 8.9.4)
  const m = Math.max(P.length, Q.length);
  const subRanges = [];
  for (let i = 0; i < m; i++) {
    subRanges.push(S.slice(P[i], Q[i] + 1));
  }

  return subRanges.map(minimalFactorInSequence);
}

console.log(solution('CAGCCTA', [2, 5, 0], [4, 5, 6]));
