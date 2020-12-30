// Continuation of async.js
const {
  banyan,
  bigOak,
  apple,
  request,
  pingAllNeighbors,
  findInStorage,
} = require('./crow-tech');

// Simple request response
request(banyan, 'bigOak', 'note', 'Cow if any enemy is in the territory')
  .then((response) =>
    console.log(`Note delivered with response ${JSON.stringify(response)}`)
  )
  .catch((error) => console.log(error.message));

// Ping available nests
pingAllNeighbors(bigOak).then((neighbors) =>
  console.log(`Available neighbors of ${bigOak.name} are ${neighbors}`)
);

// Flood crow network
request(
  apple,
  'banyan',
  'gossip',
  'There is a crow wedding 2 kms away of the network'
);

// Not direct neighbor, so it will route the request across network
// Simple request response
request(bigOak, 'apple', 'note', 'Give some apple for children')
  .then((response) =>
    console.log(
      `Note routed and delivered with response ${JSON.stringify(response)}`
    )
  )
  .catch((error) => console.log(error.message));

findInStorage(bigOak, 'enemies').then(
  (value) => console.log(`Found enemies ${value}`) // We know bigOak does not have enemies entry, it fetches from other nest
);
