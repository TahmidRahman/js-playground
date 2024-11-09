var executionTime = new Date().getTime();

setTimeout(function () {
  var callbackTime = new Date().getTime();
  var difference = (callbackTime - executionTime) / 1000;
  console.log('Should be called after 2 seconds');
  console.log(`Actually called after ${difference} seconds`);
}, 2000);

var blockingDelay = new Date();
blockingDelay.setSeconds(blockingDelay.getSeconds() + 2);

while (new Date() < blockingDelay) {
  continue;
}
