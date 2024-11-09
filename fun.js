function fun(templateStr, words) {
  const permArr = [];
  const usedItems = [];

  function permute(arr) {
    let i, item;
    for (i = 0; i < arr.length; i++) {
      item = arr.splice(i, 1)[0];
      usedItems.push(item);
      if (arr.length == 0) {
        permArr.push(usedItems.slice());
      }
      permute(arr);
      arr.splice(i, 0, item);
      usedItems.pop();
    }
    return permArr;
  }

  function template(str, args) {
    let output = str;
    for (const each of args) {
      output = output.replace('{arg}', each);
    }
    return output;
  }

  const permutedWords = permute(words);
  permutedWords.forEach((pWords) => {
    console.log(template(templateStr, pWords));
  });
}

fun('Never {arg} a {arg} by its {arg}!', ['judge', 'book', 'cover']);
