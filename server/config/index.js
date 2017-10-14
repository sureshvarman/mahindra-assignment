/**
 * ------------------------------------------------
 *  ENVIRONMENT - takes care of returning  configurations based on the
 *  node environment set
 * ------------------------------------------------
 */

 var inEnvironment = process.env.NODE_ENV || 'development';
 module.exports = require('./env/' + inEnvironment + '.js');
