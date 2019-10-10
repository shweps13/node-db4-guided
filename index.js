require('dotenv').config(); // load .env variables
console.log('node env', process.env.NODE_ENV);

const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
