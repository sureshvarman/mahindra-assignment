/**
* router which only takes care of the bookmark apis and endpoints
* @prop {mongoose.Schema.Object} models
*/

const router = require('express').Router();

module.exports = function(models, superSecret)
{
    const authAPI = require('../api/auth').init(models, superSecret);

    router.post('/login', (req, res) =>
    {
        authAPI.login(req.body)
        .then((result) =>
        {
            res.json(result);
        })
        .catch((err) =>
        {
            res.status(406).json(err);
        });
    });

    return router;
}
