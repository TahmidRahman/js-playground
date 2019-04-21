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
// let nerdPattern = /\b\d+ (book|pencil|pen)s?\b/;

// console.log(nerdPattern.test('I have 2 books')); // true
// console.log(nerdPattern.test('I have only 1 pencil')); // true
// console.log(nerdPattern.test('2 bookpens')); // false

// Replace all with regex
// console.log('papa'.replace(/p/g, 'm'));

// let wrongOrder = 'world-hello\ncare-take\non-come';
// console.log(wrongOrder.replace(/(\w+)-(\w+)/g, '$2 $1'));

// Pass func as a second argument

// console.log(
//   'In physics, we learn that alpha beta gama rays are useful'.replace(
//     /alpha|beta|gama/g,
//     str => str.toUpperCase()
//   )
// );
// function minusOne(match, amount, unit) {
//   amount = Number(amount) - 1;
//   if (amount == 1) {
//     unit = unit.slice(0, unit.length - 1);
//   } else if (amount == 0) {
//     amount = 'no';
//   }

//   return amount + ' ' + unit;
// }

// let bookDetails = 'I have 1 novel, 7 textbooks and 2 magazines';

// console.log(bookDetails.replace(/(\d+) (\w+)/g, minusOne));

// GREED
// ? symbol added to restrict greedy (repeatative) operators like +, *, ?, {}
// function stripComments(string) {
//   return string.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
// }

// console.log(stripComments('x = 1+1; // x = 2'));
// console.log(stripComments('1 /*a*/+ /* b */2 '));

// Dynamically creating regExp objectts

// let name = 'harry';
// let text = 'Harry Potter is my favorite character';

// let nameRegExp = new RegExp('\\b(' + name + ')\\b', 'ig');
// console.log(text.replace(nameRegExp, '_$1_'));

// let name = 'dea+hl[]rd';
// let text = 'dea+hl[]rd is a very notorious character';
// let escaped = name.replace(/[+*\\[?{}|^$&]/g, '\\$&');
// let regExp = new RegExp('\\b' + escaped + '\\b', 'ig');

// console.log(text.replace(regExp, '_$&_'));

// Search (Cannot give search index offset)

// console.log('Amar nam Tahmid'.search(/mid/));  // 12
// console.log('Amar nam Tahsin'.search(/mid/)); // -1

// let pattern = /y/g;
// pattern.lastIndex = 3;
// let string = 'xyxxxy';
// let match = pattern.exec(string);
// console.log(match.index);
// console.log(pattern.lastIndex);
// let global = /xyz/g;
// let sticky = /xyz/y;

// console.log(global.exec('abc xyz'));
// console.log(sticky.exec('abc xyz'));

// let numExp = /\d/g;
// console.log(numExp.exec('Here is a number: 1'));
// console.log('Last index', numExp.lastIndex);
// console.log(numExp.exec('Another num 2'));

// console.log('Banana'.match(/an/g));

// Looping over matches using global and exec and lastIndex

// let input = 'A stiring of 3 numbers containing 23,12';
// let num = /\b\d+\b/g;
// let match;
// while ((match = num.exec(input))) {
//   console.log('Found', match[0], 'at', match.index);
// }

// Parsing INI file

function parseINI(string) {
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach(line => {
    let match;
    if ((match = line.match(/^(\w+)=(.*)$/))) {
      section[match[1]] = match[2];
    } else if ((match = line.match(/^\[(.*)\]$/))) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error('Line ' + line + ' is not valid');
    }
  });

  return result;
}

let iniString =
  'searchengine=https://duckduckgo.com/?q=$1\nspitefulness=9.7\n; comments are preceded by a semicolon...\n; each section concerns an individual enemy\n[larry]\nfullname=Larry Doe\ntype=kindergarten bully\nwebsite=http://www.geocities.com/CapeCanaveral/11451\n[davaeorn]\nfullname=Davaeorn\ntype=evil wizard\noutputdir=/home/marijn/enemies/davaeorn';

// console.log(parseINI(iniString));

// International characters

console.log(/\p{Script=Bengali}/u.test('আমার নাম তাহমিদ রহমান')); // true
console.log(/\p{Number}/u.test('12123123')); // true
console.log(/\p{Alphabetic}/u.test('Abcas')); // true
