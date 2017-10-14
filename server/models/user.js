/**
* @class Tag
* @prop {mongoose.Schema.ObjectId} id - Unique identifier for a record, virtualized to email
* @prop {mongoose.Schema.String} password - http/https scheme of the bookmark
* @prop {mongoose.Schema.Date} createdAt - Date time on when the record was created
* @prop {mongoose.Schema.Date} updatedAt - Date time on when the record updated
* @prop {mongoose.Schema.String} createdBy - User Id of the record creator
* @prop {mongoose.Schema.String} updatedBy - User Id of the record updator
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var UserSchema = new Schema({
    _id: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: 'TM' },
    updatedBy: { type: String, default: 'TM' }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

UserSchema.virtual('username').get(() =>
{
    return this._id;
});

UserSchema.pre('save', function (next)
{
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) =>
    {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) =>
        {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb)
{
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) =>
    {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
