function asyncFunc(arg, callback) {
  console.log(`do something with ${arg} input`);
  setTimeout(function () {
    callback(arg * 2);
  }, 1000);
}

function final(results) {
  console.log('all done', results);
}

function series(callbacks, last) {
  var results = [];
  function next() {
    var callback = callbacks.shift();
    if (callback) {
      callback(function () {
        results.push(Array.prototype.slice.call(arguments));
        next();
      });
    } else {
      last(results);
    }
  }
  next();
}
series(
  [
    function (next) {
      asyncFunc(1, next);
    },
    function (next) {
      asyncFunc(2, next);
    },
    function (next) {
      asyncFunc(3, next);
    },
    function (next) {
      asyncFunc(4, next);
    }
  ],
  final
);
