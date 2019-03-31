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

// console.log(lastItem([2, 4]));

// finally block
const accounts = {
  a: 100,
  b: 0,
  c: 25
};

function getAccount() {
  let accountName = prompt("Which account?");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No account found named ${accountName}`);
  } else {
    return accountName;
  }
}
function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
    console.log(accounts);
  }
}

// transfer("a",25);
// Selective catching
class InputError extends Error {}

function promptDirection() {
  let dir = prompt("Where?");
  if (dir.toLowerCase() == "left") return "l";
  if (dir.toLowerCase() == "right") return "r";
  throw new InputError(`Invalid direction ${dir}`);
}

// for (;;) {
//   try {
//     let dir = promptDirection();
//     console.log("You chose", dir);
//     break;
//   } catch (error) {
//     if (error instanceof InputError) {
//       console.log("Wrong input. Try again?");
//     } else if (error instanceof ReferenceError) {
//       console.log("There might be a typo or something. Check your code?");
//       break;
//     } else throw error;
//   }
// }

// Assertion
function firstElement(array) {
  if (array.length == 0) {
    throw new Error("firstElement called on []");
  } else {
    return array[0];
  }
}

// console.log(firstElement([]));

// Exercise 1
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(x, y) {
  // Another way could be (Math.floor(Math.random() * 10))%5 ==0 ? check? Same
  if (Math.random() < 0.2) {
    return x * y;
  } else throw new MultiplicatorUnitFailure("Multiplicator unit failure");
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      if (!(error instanceof MultiplicatorUnitFailure)) {
        throw error;
      }
    }
  }
}

// console.log(reliableMultiply(8, 8));

// Exercise 2

const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  let locked = box.locked;
  if (!locked) {
    return body();
  }

  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

function someFunction() {
  box.content.push("something");
}
