/**
* @class Blog
* @prop {mongoose.Schema.ObjectId} id - Unique identifier for a record
* @prop {mongoose.Schema.String} blogTitle - Title for the blog
* @prop {mongoose.Schema.Text} content - Content for the blog
* @prop {mongoose.Schema.Date} createdAt - Date time on when the record updated
* @prop {mongoose.Schema.Date} updatedAt - Date time on when the record updated
* @prop {mongoose.Schema.String} createdBy - User Id of the record creator
* @prop {mongoose.Schema.String} updatedBy - User Id of the record updator
*/
const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const Schema = mongoose.Schema;

var BlogSchema = new Schema({
    id: { type: String },
    blogTitle: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: 'ME' },
    updatedBy: { type: String, default: 'ME' }
});

module.exports = mongoose.model('blog', BlogSchema);
