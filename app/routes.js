const home = require('./controllers/home');
const chatLogs = require('./controllers/chatLogs');
const log = require('../lib/log');

module.exports = (app) => {
  app.get('/', home.index);

  app.get('/chatLogs', chatLogs.index);

  // handle errors
  app.use((err, req, res, next) => {
    // if the error has a status, return the error with that status
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }

    const validationError = /^ValidationError:.*/;
    if (validationError.test(err.message)) {
      return res.status(400).json({ message: err.message });
    }

    if (err.message) {
      log.error(err.message);
    }

    if (err.stack) {
      log.error(err.stack);
    }

    // error page
    return res.status(500).json({ message: 'Internal Server Error' });
  });

  // assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).json({ message: '404 Not found' });
  });
};
