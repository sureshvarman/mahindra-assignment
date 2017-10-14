/**
 * main router for the individual modules
 * more server central logics can be added ad per the requirement
 */

const routes = require('./routes');

function registerAPIServer(app, database) {
  app.use('/api', routes(database, app))
}

module.exports = {
  init: registerAPIServer
}
