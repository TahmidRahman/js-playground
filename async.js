// callback practice
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function makeRequest(url, callback) {
  console.log('called');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function () {
    console.log('in callback', xhr.responseText);
    callback(xhr.responseText);
  };
  xhr.responseType = 'json';
  xhr.send();
}

const simplePromise = Promise.resolve(5);
// Simply returns the promise as it is already a promise to make sure the return of value wrapped promise
console.log(Promise.resolve(simplePromise));

simplePromise
  .then((returnedValue) => {
    console.log(returnedValue);
  })
  .then((anotherValue) => {
    console.log(
      'This should be ',
      anotherValue,
      ' as no value passed from previous callback.',
      '\nBut it is stll called'
    );
  });

const chainPromise = Promise.resolve(8);
chainPromise
  .then((value) => {
    console.log('Resolved value is ', value, ' as it was set 8');
    return Promise.resolve(value + 7);
  })
  .then((value2) => {
    console.log('Resolved value should be 15 and it is ', value2); // then returns Promise.resolve(returnValue)
  });

const bigOak = {
  readStorage(name, callBack) {
    if (name == 'enemies') {
      callBack('Ravens');
    } else {
      callBack('unknown');
    }
  },
};

function storage(nest, name) {
  return new Promise((resolve) => {
    nest.readStorage(name, (value) => resolve(value));
  });
}

storage(bigOak, 'enemies').then((value) => console.log(`Got ${value}`));

const rejection = Promise.reject(new Error('Boom!!'));
rejection
  .catch((error) => {
    console.log(`Error is message is ${error.message}`);
    throw new Error('Now take that chain Error!');
  })
  .catch((error2) => {
    console.log(`As in reply of "${error2.message}", no offense taken`);
  });

const wholeSomePromise = (status) =>
  new Promise((resolve, reject) => {
    if (status == 'fail') {
      reject('wholesome error!');
    } else {
      resolve('nicely resolved');
    }
  });

wholeSomePromise().then((value) =>
  console.log(`A wholesome promise is usually ${value}`)
);

wholeSomePromise('fail').then(undefined, (error) =>
  console.log(`But a wholesome promise can possibly get a ${error}`)
);

new Promise((_, reject) => reject(new Error('Fail')))
  .then((value) => console.log(`Handler 1: ${value}`))
  .catch((error) => {
    console.log(`Failed. caught ${error}`);
    return 88;
  })
  .then((value) => console.log(`Handler 2: ${value}`));
