function maximumOccurringCharacter(text) {
  // Write your code here
  let count = {};
  for (let i = 0; i < text.length; i++) {
    const c = text.charAt(i);
    if (count[c]) {
      count[c]++;
    } else {
      count[c] = 1;
    }
  }

  const maxOccurance = Math.max(...Object.values(count));
  const [char] = Object.entries(count).find(
    ([_, occurance]) => occurance === maxOccurance
  );
  return char;
}

console.log(maximumOccurringCharacter("hello world"));
