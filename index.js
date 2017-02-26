const http = require('http');
const config = require('config');
const log = require('./lib/log');
const app = require('./lib/server');
const chat = require('./lib/chat');

const server = http.createServer(app);
chat.start(server);

server.listen(config.server.port, () => {
  log.info(`App listening on port ${config.server.port}!`);
});
