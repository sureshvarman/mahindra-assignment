/**
 * Index router to handle proxying the request to individual modules
 */

const router = require('express').Router();
const blogRouter = require('./blog');
const userRouter = require('./user');
const authRouter = require('./auth');

const authenticationMiddleware = require('../middlewares/authenticate');
const socketIo = require('../socket.js');

module.exports = function(models, app)
{
  router.use('/blog', authenticationMiddleware(app, true), blogRouter(models, socketIo(app)));
  router.use('/user', userRouter(models));
  router.use('/auth', authRouter(models, app.get('superSecret')));

  return router;
}
