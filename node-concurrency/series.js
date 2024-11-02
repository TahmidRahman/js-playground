function asyncFunc(arg, callback) {
  console.log(`do something with ${arg} input`);
  setTimeout(() => callback(arg * 2), 1000);
}

function final() {
  console.log('all done', results);
}
var items = [1, 2, 3, 4];
var results = [];

function series(item) {
  if (item) {
    asyncFunc(item, (res) => {
      results.push(res);
      return series(items.shift());
    });
  } else {
    final();
  }
}

series(items.shift());
