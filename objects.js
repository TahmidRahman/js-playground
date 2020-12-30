// Exercise 1: Vector

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }

  minus(vector) {
    return new Vec(this.x - vector.x, this.y - vector.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

// Exercise 2+3:
class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter((v) => v !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(iterableSource) {
    let group = new Group();
    for (let value of iterableSource) {
      group.add(value);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

Group.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i < this.members.length; i++) {
    yield this.members[i];
  }
};

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index >= this.group.members.length) return { done: true };
    else {
      let value = this.group.members[this.index];
      this.index++;
      return { value, done: false };
    }
  }
}

// for (let value of Group.from(["a", "b", "c"])) {
//   console.log(value);
// }

// Exercise 4

let obj = {
  a: 4,
  hasOwnProperty: true,
};

console.log(Object.prototype.hasOwnProperty.call(obj, 'a'));
// test new iterator : generator function
console.log(Group.prototype[Symbol.iterator]);
for (let each of Group.from([1, 2, 3])) {
  console.log(each);
}
