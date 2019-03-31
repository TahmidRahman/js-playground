const SCRIPTS = require("./scripts");

function every(arr, predicate) {
  return arr.reduce((a, b) => a && predicate(b), true);
}

function every2(arr, predicate) {
  return !arr.some(n => !predicate(n));
}

function every3(arr, predicate) {
  for (let i of arr) {
    if (!predicate(i)) return false;
  }
  return true;
}

function characterCode(code) {
  return SCRIPTS.find(s =>
    s.ranges.some(([from, to]) => code >= from && code < to)
  );
}

function countBy(array, groupName) {
  let counts = [];
  for (let i of array) {
    let name = groupName(i);
    let index = counts.findIndex(c => c.name === name);
    if (index === -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[index].count++;
    }
  }
  return counts;
}

function dominantDirection(text) {
  let counts = countBy(text, char => {
    let script = characterCode(char.codePointAt(0));
    return script ? script.direction : "unknown";
  }).filter(({ name }) => name != "unknown");

  if (counts.length === 0) return "ltr";

  return counts.reduce((a, b) => (a.count > b.count ? a : b)).name;
}

console.log(dominantDirection("Hey, مساء الخير"));
