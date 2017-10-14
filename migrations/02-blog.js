
const config = require('../server/config');
const models = require('../server/models');
const blogs = require('./02-blog.json'); // #TODO, we should not use the password inside test data
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
        let blogCreation = Promise.all(blogs.map((blogData) =>
        {
            const blog = new db.Blog({
              id: blogData.id,
              blogTitle: blogData.blogTitle,
              content: blogData.content,
              createBy: blogData.createBy
            });

            return blog.save();
        }));

        return blogCreation;
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
        return db.Blog.remove({id: {$in: blogs.map((data) => {return data.id})} });
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
