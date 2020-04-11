exports.expect = function(value) {
  return {
    toBe: expectedValue => {
      if (value === expectedValue) {
        console.log('\x1b[32m', 'Test passed \u2713', '\x1b[0m');
      } else {
        console.error(
          '\x1b[31m',
          `Wrong answer expected ${expectedValue}, but got ${value}`,
          '\x1b[0m'
        );
      }
    }
  };
};
