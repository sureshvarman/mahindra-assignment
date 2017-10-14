/**
* router which only takes care of the bookmark apis and endpoints
* @prop {mongoose.Schema.Object} models
*/

const router = require('express').Router();

module.exports = function(models)
{
    const userAPI = require('../api/user').init(models);

    router.post('/', (req, res) =>
    {
        userAPI.create(req.body)
        .then((result) =>
        {
            res.json(result);
        })
        .catch((err) =>
        {
            res.status(406).json(err);
        })
    });

    return router;
}
