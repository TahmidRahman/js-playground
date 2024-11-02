function asyncFunc(arg, callback) {
  console.log(`do something with ${arg} input`);
  setTimeout(() => callback(arg * 2), 1000);
}

function final() {
  console.log('all done', results);
}
var items = [1, 2, 3, 4, 5, 6, 7];
var results = [];

var running = 0;
var limit = 2;

function launcher() {
  while (running < limit && items.length > 0) {
    asyncFunc(items.shift(), function (res) {
      results.push(res);
      running--;
      if (items.length > 0) {
        launcher();
      } else if (running == 0) {
        final();
      }
    });
    running++;
  }
}

launcher();
