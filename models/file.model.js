
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var fileSchema = new mongoose.Schema({
    mimeType: String,
    originalname: String,
    FileName: String,
    FileSize : Number ,
    ImagePath : String,
    ThumbPath : String,
    exerciseId: String,
    type: String,
})

fileSchema.plugin(mongoosePaginate)
const file = mongoose.model('file', fileSchema)

module.exports = file;
