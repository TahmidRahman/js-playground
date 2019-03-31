// console.log(/abc\\/.test("abc\\"));

// Rule: [0-9] = \d

// console.log(/\d\d-\d\d-\d\d\d\d \d\d:\d\d/.test("18-08-2018 13:59"));
// console.log(/[\d-]/.test("18-08-1992"));

// Caret ( ^ ) char to invert char rule

// let notBinary = /[^01]/;
// console.log(notBinary.test("98797465"));
// console.log(notBinary.test("0001010010100"));

// Test +, * for repeating occurance ( * also gives true for 0 occurances while + doesn't)

// console.log(/"\d+"/.test('"123"'));
// console.log(/"\d+"/.test('""'));
// console.log(/"\d*"/.test('"123"'));
// console.log(/"\d*"/.test('""'));

// ? for optional char

// let colorUniversal = /colou?r/;
// console.log(colorUniversal.test("color")); // US
// console.log(colorUniversal.test("colour")); // GBR

// Specify fix or ranged number of occurances by {n} or {rangeStart,rangeEnd}

// let dateFormat = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
// console.log(dateFormat.test("20-5-1994 4:58"));

// Open ended ranges like n or more times : {n,}
// let atLeast3Times = /\d{3,}/;
// console.log(atLeast3Times.test("132123"));
// console.log(atLeast3Times.test("13"));

// Group sub expressions with ()
// i at the end means Case insensitive

// let cartoonLaughing = /ba+(ha+)+/i;
// console.log(cartoonLaughing.test("BAHAHAHAAA"));
// console.log(cartoonLaughing.test("baha"));
// console.log(cartoonLaughing.test("BahaaHaaaaaaaaaaaaaa"));

// Exec and match
// let numberMatch = /\d+/.exec("one two 100");
// console.log(numberMatch);
// console.log(numberMatch.index);

// console.log("one two 100".match(/\d+/));
// result: [ '100', index: 8, input: 'one two 100', groups: undefined ]

// When group, first element in array is whole match, then first group second element... so on
// let quotedText = /'([^']*)'/;
// console.log(quotedText.exec("she said 'hello'"));

// Second element undefined cause group has no match, if many matches, second element last match of the group
console.log(/bad(ly)?/.exec("bad")); // [ 'bad', undefined, index: 0, input: 'bad', groups: undefined ]
console.log(/(\d)+/.exec("324")); // [ '324', '4', index: 0, input: '324', groups: undefined ]
