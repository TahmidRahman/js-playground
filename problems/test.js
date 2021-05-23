function arrayInSameOrder(values, expectedValue) {
  if (
    typeof values == 'object' &&
    typeof expectedValue == 'object' &&
    values.length &&
    expectedValue.length
  ) {
    // Arrays in same order
    return values.toString() === expectedValue.toString();
  } else {
    throw new Error('Invalid type, expected type array');
  }
}

function showTestPassedText(text = 'Test passed') {
  console.log('\x1b[32m', `${text} \u2713`, '\x1b[0m');
}

function showErrorText(
  value,
  expectedValue,
  text = `Wrong answer expected ${expectedValue}, but got ${value}`
) {
  console.error('\x1b[31m', text, '\x1b[0m');
}

exports.expect = function (value) {
  return {
    toBe: (expectedValue) => {
      if (value == expectedValue) {
        showTestPassedText();
      } else {
        showErrorText(value, expectedValue);
      }
    },
    toBeInSameOrder: (expectedValue) => {
      if (arrayInSameOrder(value, expectedValue)) {
        showTestPassedText('Arrays test passed');
      } else {
        showErrorText(value, expectedValue);
      }
    }
  };
};
