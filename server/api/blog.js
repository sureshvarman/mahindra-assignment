/**
* ------------------------------------------------------------------------
* API definitions for class blog
* list the blogs and also has operation to edit the blog
* ------------------------------------------------------------------------
*/

const Promise = require('bluebird');
const async = require('async');

/**
* @class Blog - defines model function, acts as a curry function
* @prop {mongooseObject} models
* @return {Object}
*/
var blog = function(models)
{
    return {
        /**
        * function to create a blog record
        * @param {mongoose.Schema.Blog} data
        * @return {Promise}
        */
        create: function(data)
        {
            var blogData = new models.Blog({
                id: data.blogTitle ? data.blogTitle.trim() : '',
                blogTitle: data.blogTitle,
                content: data.content,
                createdBy: data.createdBy
            });

            return blogData.save();
        },

        /**
        * function to update a blog record
        * @param {mongoose.Schema.Blog} data
        * @return {Promise}
        */
        update: function(data)
        {
            return new Promise((resolve, reject) =>
            {
                models.Blog.find({
                    id: data.id,
                    createdBy: data.updatedBy
                })
                .then((blogData) =>
                {
                    if (blogData)
                    {
                        resolve(
                            models.Blog.findOneAndUpdate(
                                {id: data.id},
                                {
                                    blogTitle: data.blogTitle,
                                    content: data.content,
                                    updatedBy: data.updatedBy
                                }
                            )
                        );
                    }
                    else
                    {
                        reject(new Error(403));
                    }
                })
            });
        },

        /**
        * function to delete a blog record
        * @param {mongoose.Schema.Blog} data
        * @return {Promise}
        */
        deleteById: function(id)
        {
            return new Promise((resolve, reject) =>
            {
                models.Blog.find({
                    id: data.id,
                    createdBy: data.updatedBy
                })
                .then((blogData) =>
                {
                    if (blogData)
                    {
                        resolve(models.Blog.remove({ id: id }));
                    }
                    else
                    {
                        reject(new Error(403));
                    }
                });
            });
        },

        /**
        * function to get the blog data
        * @param {mongoose.Schema.Blog} data
        * @return {Promise}
        */
        getById: function(id)
        {
            return models.Blog.findOne({id: id});
        },

        /**
        * function to get the blogs data
        * @param {mongoose.Schema.Blog} data
        * @return {Promise}
        */
        get: function(limit, offset)
        {
            limit = limit > 0 ? limit : 10;
            offset = offset > -1 ? offset : 0;

            return new Promise((resolve, reject) =>
            {
                const countQuery = function(callback)
                {
                    models.Blog.count()
                    .then((data) =>
                    {
                        callback(null, data);
                    })
                    .catch(callback);
                }

                const retrieve = function(callback)
                {
                    var blogData = models.Blog.find();

                    blogData.skip(offset)
                      .limit(limit)
                      .exec(callback);
                }

                async.parallel([countQuery, retrieve], (err, data) => {
                  if (err)
                    reject(err);

                  var response = {};
                  response.nextLimit = limit;
                  response.nextOffset = offset + limit;
                  response.count = data[0];
                  response.data = data[1];

                  resolve(response);
                });
            });
        }
    }
}

module.exports = {
    init: blog
}
