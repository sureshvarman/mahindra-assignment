/**
* ------------------------------------
* API definitions for class user
* only create for now
* ------------------------------------
*/


/**
* @class User - defines model function, acts as a curry function
* @prop {mongooseObject} models
* @return {Object}
*/
var user = function(models)
{
    return {
        /**
        * function to create a user record
        * @param {mongoose.Schema.User} data
        * @return {Promise}
        */
        create: function(data)
        {
            var userData = new models.User({
                _id: data.username,
                password: data.password
            });

            return userData.save()
            .then((e) => {console.log(e)})
            .catch((e) => {console.log(e)});
        }
    }
}

module.exports = {
    init: user
}
