function asyncFunc(arg, callback) {
  console.log(`do something with ${arg} input`);
  setTimeout(function () {
    callback(arg * 2);
  }, 1000);
}

function final(results) {
  console.log('all done', results);
}

function limitedParallel(limit, callbacks, last) {
  var results = [];
  var running = 1;
  var task = 0;
  function next() {
    running--;
    if (task == callbacks.length && running == 0) {
      last(results);
    }
    while (running < limit && callbacks[task]) {
      var callback = callbacks[task];
      (function (index) {
        callback(function () {
          results[index] = Array.prototype.slice.call(arguments);
          next();
        });
      })(task);
      running++;
      task++;
    }
  }
  next();
}

limitedParallel(
  2,
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
    },
    function (next) {
      asyncFunc(5, next);
    },
    function (next) {
      asyncFunc(6, next);
    }
  ],
  final
);
