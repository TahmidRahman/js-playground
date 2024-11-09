// const fs = require('fs');

// fs.readFile('./blocker.js', function () {
//   setTimeout(() => {
//     console.log('timeout 1');
//   }, 1000);
//   setImmediate(() => {
//     console.log('immediate 1');
//   });
// });

// fs.readFile('./song.js', function () {
//   setTimeout(() => {
//     console.log('timeout 2');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate 2');
//   });
// });

setTimeout(() => {
  console.log('timeout 1');
}, 0);

setImmediate(() => {
  console.log('immediate 1');
});
