// regexp solution
let canSegmentString = function (s, dictionary) {
  //TODO: Write - Your - Code
  const setIterable = dictionary[Symbol.iterator]();
  for (let item of setIterable) {
    const regex = new RegExp(item, 'g');
    s = s.replace(regex, '');
  }
  return !s;
};
