// Continuation of async.js
const { banyan, request } = require('./crow-tech');

request(banyan, 'bigOak', 'note', 'Cow if any enemy is in the territory')
  .then((response) =>
    console.log(`Note delivered with response ${JSON.stringify(response)}`)
  )
  .catch((error) => console.log(error.message));
