
const config = require('../server/config');
const models = require('../server/models');
const users = require('./01-user.json'); // #TODO, we should not use the password inside test data
const Promise = require('bluebird');

/**
* migration script for test user
* execute on up
*/
exports.up = function(next)
{
    models.init(config)
    .then((db) =>
    {
        let userCreation = Promise.all(users.map((userData) =>
        {
            const user = new db.User({
              _id: userData.username,
              password: userData.password
            });
            return user.save();
        }));

        return userCreation;
    })
    .then(() =>
    {
        next();
    })
    .catch((err) =>
    {
        next(err);
    })
};

exports.down = function(next)
{
    models.init(config)
    .then((db) =>
    {
        return db.User.remove({_id: {$in: users.map((data) => {return data.username})} });
    })
    .then(() =>
    {
        next();
    })
    .catch((err) =>
    {
        next(err);
    })
};
