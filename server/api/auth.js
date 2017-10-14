/**
* ------------------------------------
* API definitions for user authentication
* only create for now
* ------------------------------------
*/

const jwt = require('jsonwebtoken');

/**
* @class Auth - defines model function, acts as a curry function
* @prop {mongooseObject} models
* @prop {String} superSecret
* @return {Object}
*/
var auth = function(models, superSecret)
{
    return {
        /**
        * function to create a user record
        * @param {data.username} string
        * @param {data.password} string
        * @return {Promise}
        */
        login: function(data)
        {
            return new Promise((resolve, reject) =>
            {
                models.User.findOne({ _id: data.username })
                .then((User) =>
                {
                    User.comparePassword(data.password, function(err, result)
                    {
                        if (err) return reject(err);

                        var token = jwt.sign({userId: data.username}, superSecret, {
                            expiresIn: 1440 * 60
                        });

                        resolve({token: token, username: data.username});
                    });
                })
                .catch(reject);
            });
        }
    }
}

module.exports = {
    init: auth
}
