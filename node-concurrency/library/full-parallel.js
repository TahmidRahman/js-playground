function asyncFunc(arg, callback) {
  console.log(`do something with ${arg} input`);
  setTimeout(() => callback(arg * 2), 1000);
}

function final(results) {
  console.log('all done', results);
}

function fullParallel(callbacks, last) {
  var results = [];
  var result_counted = 0;
  callbacks.forEach(function (callback, i) {
    callback(function () {
      results[i] = Array.prototype.slice.call(arguments);
      result_counted++;
      if (callbacks.length == result_counted) {
        last(results);
      }
    });
  });
}

fullParallel(
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
