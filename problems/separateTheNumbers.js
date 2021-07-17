function separateNumbers(s) {
  // Write your code here
  s = BigInt(s).toString();
  let varString;
  let length = 1;
  let initMatch;
  let matchFound = false;

  while (!matchFound && length <= Math.floor(s.length / 2) && s.length > 1) {
    varString = s;
    initMatch = s.substr(0, length);
    for (let match = initMatch; ; ) {
      const pattern = new RegExp(match);
      if (varString.search(pattern) == 0) {
        varString = varString.replace(pattern, '');
        match = BigInt(BigInt(match) + BigInt(1)).toString();
      } else if (varString.search(pattern) != 0) {
        if (varString.length == 0) {
          matchFound = true;
        }
        break;
      }
    }
    length++;
  }

  return matchFound ? `YES ${initMatch}` : 'NO';
}
const { expect } = require('./test');

// expect(separateNumbers('99910001001')).toBe('YES 999');
// expect(separateNumbers('7891011')).toBe('YES 7');
// expect(separateNumbers('9899100')).toBe('YES 98');
// expect(separateNumbers('999100010001')).toBe('NO');
// expect(separateNumbers('99100')).toBe('YES 99');

const tc16Input = [
  '51073756645096775107375664509678',
  '51073756645096775107375664509668',
  '96589218797811259658921879781126',
  '96589218797811259658921879781026',
  '960567818611458960567818611459',
  '960567818611458960567818610459',
  '65651460403999656565146040399966',
  '65651460403999656565146040389966',
  '84137510565804148413751056580415',
  '84137510565804148413751056480415'
];
const tc16Output = [
  'YES 5107375664509677',
  'NO',
  'YES 9658921879781125',
  'NO',
  'YES 960567818611458',
  'NO',
  'YES 6565146040399965',
  'NO',
  'YES 8413751056580414',
  'NO'
];
tc16Input.forEach((input, index) => {
  expect(separateNumbers(input)).toBe(tc16Output[index]);
});
