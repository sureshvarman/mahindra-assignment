/**
* middleware function to monitor the authentication using the provided token and validate the user
* @prop {ExpressObject} app
*/

const jwt = require('jsonwebtoken');

/**
* @param {ExpressObject} app
* @param {Boolean} ignoreOnEmpty
*/
var authenticationMiddleware = function(app, ignoreOnEmpty)
{
    return function(req, res, next)
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token)
        {

            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err)
                {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                }
                else
                {
                    req.decoded = decoded;
                    next();
                }
            });

        }
        else if (!ignoreOnEmpty)
        {

            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
        else
        {
            next();
        }
    }
}

module.exports = authenticationMiddleware
