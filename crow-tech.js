const CROW_NETWORK_LATENCY = 200; // Configure to see effects of retry requests
const RETRY_REQUEST_DURATION = 500;

function readStorage(name, callback) {
  if (name == 'enemies') {
    callback('Ravens');
  } else {
    callback('unknown');
  }
}

function defineRequestType(type, handler) {
  this.handlers[type] = handler;
}

function requestType(type, handler) {
  defineRequestType.call(this, type, (nest, content, source, callback) => {
    try {
      Promise.resolve(handler(nest, content, source)).then(
        (value) => callback(null, value),
        (failed) => callback(failed)
      );
    } catch (error) {
      callback(error);
    }
  });
}
const crowNetwork = ['bigOak', 'banyan', 'yarn', 'riverSide'];

function Nest(name) {
  this.name = name;
  this.handlers = Object.create(null);
  this.readStorage = readStorage;
  this.neighbors = crowNetwork.filter((nestName) => nestName != name);

  // install note handler
  this._requestType('note', (nest, content, source, done) => {
    console.log(`${nest.name} received note "${content}" from ${source}`);
    return { crowStatus: 200 };
  });

  // install ping handler
  this._requestType('ping', () => 'pong');

  // unknown type handler
  this._requestType('unkwown', (_, _2, _3, done) => {
    setTimeout(done, CROW_NETWORK_LATENCY);
  });
}

Nest.prototype._requestType = requestType;
Nest.prototype.send = function (dest, type, content, callback) {
  crowFetch(this.name, dest, type, content, callback)
    .then((value) => callback(null, value))
    .catch((failed) => callback(failed));
};

const nests = crowNetwork.map((name) => new Nest(name));

function crowFetch(source, dest, type, content, callback) {
  const target = nests.find((nest) => nest.name == dest);
  if (!target) {
    return Promise.reject(new Error(`${dest} not found in crow network`));
  } else {
    return new Promise((resolve, reject) => {
      if (target.handlers[type]) {
        setTimeout(() => {
          resolve(target.handlers[type](target, content, source, callback));
        }, CROW_NETWORK_LATENCY);
      } else {
        reject(new Error('Handler not found'));
      }
    });
  }
}

class TimeOut extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (error, value) => {
        done = true;
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });

      setTimeout(() => {
        if (done) return;
        else if (n < 3) {
          attempt(n + 1);
        } else {
          reject(new TimeOut('Timed out'));
        }
      }, RETRY_REQUEST_DURATION);
    }
    attempt(1);
  });
}

const [bigOak, banyan] = nests;

exports.bigOak = bigOak;
exports.banyan = banyan;
exports.request = request;
// make riverSide unavailable for ping
nests[3].handlers.ping = undefined;

exports.pingAllNeighbors = function (nest) {
  const requests = nest.neighbors.map((neighbor) => {
    return request(nest, neighbor, 'ping').then(
      () => true,
      () => false
    );
  });
  return Promise.all(requests).then((result) => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
};
