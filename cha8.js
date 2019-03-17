function test(label, body) {
  if (!body()) {
    console.log(`Failed :${label}`);
  }
}

test("Upper case Latin characters", () => {
  return "Hello world".toUpperCase() == "HELLO WORLD";
});

// Arabic characters
test("Don't convert case-less characters", () => {
  return "􀟈􀠶􀢎􀰆􀯷".toUpperCase() == "􀟈􀠶􀢎􀰆􀯷";
});

function numberToString(n, base = 10) {
  let sign = "",
    result = "";

  if (n < 0) {
    sign = "-";
  }

  do {
    result = (n % base) + result;
    n = Math.floor(n / base);
  } while (n > 0);

  return sign + result;
}

// console.log(numberToString(13, 10));
function promptNumber(question) {
  let result = Number(prompt(question));
  if (isNaN(result)) return null;
  else return result;
}

// To run in browser
// console.log(promptNumber("How many trees do you see?"));

// Wrapping result in an object and introducing a "failed property" to distinguish success failure
function lastItem(array) {
  if (array.length == 0) {
    return { failed: true };
  } else {
    return { element: array[array.length - 1] };
  }
}

console.log(lastItem([2, 4]));
