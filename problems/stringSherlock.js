function isValid(s) {
  // Write your code here
  const alphabet = new Array(26);
  alphabet.fill(0);

  for (let c of s) {
    if (
      c.charCodeAt() >= 'a'.charCodeAt() &&
      c.charCodeAt() <= 'z'.charCodeAt()
    ) {
      const index = c.charCodeAt() - 'a'.charCodeAt();
      ++alphabet[index];
    }
  }

  let result = 'NO';
  const occuranceMap = alphabet.filter(Boolean).reduce((map, occurance) => {
    if (!map[occurance]) {
      return {
        ...map,
        [occurance]: 1
      };
    } else {
      return {
        ...map,
        [occurance]: map[occurance] + 1
      };
    }
  }, []);

  if (Object.keys(occuranceMap).length == 1) {
    result = 'YES';
  } else if (Object.keys(occuranceMap).length == 2) {
    const [occurance1, occurance2] = Object.keys(occuranceMap);
    if (
      Math.abs(occurance1 - occurance2) == 1 &&
      occuranceMap[Math.max(occurance1, occurance2)] == 1
    ) {
      result = 'YES';
    }

    if (occuranceMap[1] && occuranceMap[1] == 1) {
      result = 'YES';
    }
  }

  return result;
}
