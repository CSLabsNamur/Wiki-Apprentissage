
const debug = require('debug')('raneto');

const raneto = require('../app/index.js');
const config = require('./config.default');

const app = raneto(config);
const PORT = config.port;

app.listen(PORT, err => {
  if (err) {
    debug(`Server failed to start on port ${PORT}.`);
    return;
  }

  debug(`HTTP server listening on port ${PORT}...`);
});
