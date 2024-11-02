function asyncFunc(arg, callback) {
  console.log(`do something with ${arg} input`);
  setTimeout(function () {
    callback(arg * 2);
  }, 1000);
}

function final() {
  console.log('all done', results);
}
var items = [1, 2, 3, 4];
var results = [];

items.forEach((item) => {
  asyncFunc(item, function (res) {
    results.push(res);
    if (items.length === results.length) {
      final();
    }
  });
});
