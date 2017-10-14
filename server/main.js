const express = require('express');
const path = require('path');
const compress = require('compression');
const config = require('./config');
const bodyParser = require('body-parser');

const app = express()

// Apply gzip compression
app.use(compress())

app.use(bodyParser.json())


// user api server
const apiServer = require('./api-server.js');
const webpackServer = require('./webpack-server.js');

const models = require('./models');

models.init(config)
.then((database) => {
  app.set('superSecret', config.secret);
  apiServer.init(app, database);
  webpackServer.init(app);
})
.catch((err) =>
{
    console.log('Error on DB connection', err);
    process.exit();
})

module.exports = app
