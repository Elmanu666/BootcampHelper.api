
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var commentSchema = new mongoose.Schema({
    object: String,
    objectId: String,
    creationDate: Date,
    updateDate: Date,
    updated: Boolean,
    comment : String,

})

commentSchema.plugin(mongoosePaginate)
const comment = mongoose.model('comment', commentSchema)

module.exports = comment;
