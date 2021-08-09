let canSegmentString = function (s, dictionary) {
  //TODO: Write - Your - Code
  let first;
  let second;
  for (let i = 1; i < s.length; i++) {
    first = s.substr(0, i);
    if (dictionary.has(first)) {
      second = s.substr(i);
      if (!second || dictionary.has(second)) {
        return true;
      }
      if (canSegmentString(second, dictionary)) {
        return true;
      }
    }
  }

  return false;
};
