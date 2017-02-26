const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const nodeEnv = process.env.NODE_ENV;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (nodeEnv !== 'test') {
  app.use(morgan('combined'));
}

app.use(cors());
require('../app/routes')(app);

module.exports = app;
