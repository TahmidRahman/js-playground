const CROW_NETWORK_LATENCY = 200; // Configure to see effects of retry requests
const RETRY_REQUEST_DURATION = 500;

function readStorage(name, callback) {
  if (name == 'enemies') {
    callback('Ravens');
  } else {
    callback('unknown');
  }
}

const crowNetwork = ['bigOak', 'banyan', 'yarn', 'sycamore', 'willow', 'apple'];

const crowNeighborGraph = {
  bigOak: ['banyan', 'willow', 'yarn'],
  banyan: ['bigOak', 'apple'],
  yarn: ['sycamore', 'apple', 'bigOak'],
  sycamore: ['yarn', 'willow'],
  willow: ['bigOak', 'sycamore'],
  apple: ['banyan', 'yarn'],
};

function Nest(name) {
  this.name = name;

  this.neighbors = crowNeighborGraph[name];
  this.state = {};
}

function defineRequestType(type, handler) {
  if (!Nest.prototype.handlers) {
    Nest.prototype.handlers = {};
  }
  Nest.prototype.handlers[type] = handler;
}

function requestType(type, handler) {
  defineRequestType(type, (nest, content, source, callback) => {
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

// install note handler
requestType('note', (nest, content, source, done) => {
  console.log(`${nest.name} received note "${content}" from ${source}`);
  return { received: true };
});

// install ping handler
requestType('ping', () => 'pong');

const allNests = crowNetwork.map((name) => new Nest(name));

function everywhere(handler) {
  allNests.forEach(handler);
}
Nest.prototype.delayedSend = function (dest, type, content, callback) {
  const findAndHandleRequest = new Promise((resolve, reject) => {
    // Because each nest has a scope of its neighboring nests
    const neighborNests = allNests.filter(({ name }) =>
      this.neighbors.includes(name)
    );
    const destinationNest = neighborNests.find(({ name }) => name == dest);
    if (!destinationNest) {
      reject(new Error(`${dest} not found in the neighbors!`));
    } else {
      setTimeout(() => {
        resolve(
          destinationNest.handlers[type](
            destinationNest,
            content,
            this.name,
            callback
          )
        );
      }, CROW_NETWORK_LATENCY); // To understand retry policy
    }
  });

  findAndHandleRequest
    .then((value) => callback(null, value))
    .catch((failed) => callback(failed));
};

Nest.prototype.send = function (target, type, content, callback) {
  const neighborNests = allNests.filter(({ name }) =>
    this.neighbors.includes(name)
  );
  const neighborTarget = neighborNests.find(({ name }) => name == target);
  if (!neighborTarget) {
    routeRequest(this, target, type, content);
  } else {
    neighborTarget.handlers[type](neighborTarget, content, this.name, callback);
  }
};

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

const [bigOak, banyan, yarn, sycamore, willow, apple] = allNests;

exports.bigOak = bigOak;
exports.banyan = banyan;
exports.apple = apple;

exports.request = request;

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

everywhere((nest) => {
  nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message);
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, 'gossip', message);
  }
}

requestType('gossip', (nest, message, source) => {
  if (nest.state.gossip.includes(message)) return;
  console.log(`${nest.name} received gossip ${message} from ${source}`);
  sendGossip(nest, message, source);
});

requestType('connections', (nest, { name, neighbors }, source) => {
  let connections = nest.state.connections;
  if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors))
    return;
  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, 'connections', {
      name,
      neighbors: nest.state.connections.get(name),
    });
  }
}

everywhere((nest) => {
  nest.state.connections = new Map();
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
});

function findRoute(from, to, connections) {
  let work = [{ at: from, via: null }];
  for (let i = 0; i < work.length; i++) {
    let { at, via } = work[i];
    for (let next of connections.get(at) || []) {
      if (next == to) return via;
      if (!work.some((w) => w.at == next)) {
        work.push({ at: next, via: via || next });
      }
    }
  }

  return null;
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target, nest.state.connections);
    if (!via) {
      throw new Error(`No route to ${target}`);
    }
    return request(nest, via, 'route', { target, type, content });
  }
}

requestType('route', (nest, { target, type, content }) =>
  routeRequest(nest, target, type, content)
);

exports.routeRequest = routeRequest;
