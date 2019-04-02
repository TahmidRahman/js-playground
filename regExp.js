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
// console.log(/bad(ly)?/.exec('bad')); // [ 'bad', undefined, index: 0, input: 'bad', groups: undefined ]
// console.log(/(\d)+/.exec('324')); // [ '324', '4', index: 0, input: '324', groups: undefined ]

// Date
// console.log(new Date()); // Todays date
// console.log(new Date(2019, 1, 28, 12, 34, 56, 800)); // specific date
// console.log(new Date(Date.now())); // Todays date

// let date = new Date(2013, 4, 5, 14, 15, 13, 450);
// console.log('Full year', date.getFullYear());
// console.log('Month', date.getMonth());
// console.log('Day', date.getDate());
// console.log('Hours', date.getHours());
// console.log('Minutes', date.getMinutes());
// console.log('Seconds', date.getSeconds());
// console.log(`${date.getFullYear()} - 1900`, date.getYear());
// console.log('Number of miliseconds since 1970', date.getTime());

// This function extracts date value with a date regex in a word boundary from any string

// Word boundary : /b..../b

// function getDate(string) {
//   let [_, day, month, year] = /\b(\d{1,2})-(\d{1,2})-(\d{4})\b/.exec(string);
//   return new Date(year, month - 1, day);
// }

// console.log(getDate('I was born on 18-8-1994')); //  1994-08-17T18:00:00.000Z

// Choice Patterns
let nerdPattern = /\b\d+ (book|pencil|pen)s?\b/;

console.log(nerdPattern.test('I have 2 books')); // true
console.log(nerdPattern.test('I have only 1 pencil')); // true
console.log(nerdPattern.test('2 bookpens')); // false
