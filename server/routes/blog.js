/**
* router only takes care od blog related queries
* @prop {mongoose.Schema.Object} models
*/

const router = require('express').Router();

module.exports = function(models, superSecret, events)
{
    const blogAPI = require('../api/blog').init(models);

    // get request by id
    router.get('/:id', (req, res) =>
    {
        blogAPI.getById(req.params.id)
        .then((result) =>
        {
            if (result)
                return res.json(result);

            res.status(404).json();

        })
        .catch((err) =>
        {
            res.status(406).json(err);
        })
    });

    // simple get request
    router.get('/', (req, res) =>
    {
        blogAPI.get()
        .then((result) =>
        {
            if (result)
                return res.json(result);

            res.status(404).json();

        })
        .catch((err) =>
        {
            console.log(err);
            res.status(406).json(err);
        })
    });

    // simple post request to create
    router.post('/', (req, res) =>
    {
        blogAPI.create({
            blogTitle: req.body.blogTitle,
            content: req.body.content,
            createdBy: req.decoded ? req.decoded.userId : null
        })
        .then(() =>
        {
            res.json();
        })
        .catch((err) =>
        {
            res.status(406).json(err);
        })
    });

    // simple update record
    router.put('/:id', (req, res) =>
    {
        blogAPI.update({
            id: req.params.id,
            blogTitle: req.body.blogTitle,
            content: req.body.content,
            updatedBy: req.decoded ? req.decoded.userId : null
        })
        .then(() =>
        {
            events.emitNewBlog(req.params.id);
            res.json();
        })
        .catch((err) =>
        {
            console.log(err);
            res.status(406).json(err);
        })
    });

    // simple delete record
    router.delete('/:id', (req, res) =>
    {
        blogAPI.delete(req.params.id)
        .then(() =>
        {
            res.json();
        })
        .catch((err) =>
        {
            res.status(406).json(err);
        });
    });

    return router;
}
