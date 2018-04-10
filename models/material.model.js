
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var materialSchema = new mongoose.Schema({
    title: String,
    description: String,
    weigth : Number,
    length : Number,
    strength : String,
    picture: String

})

materialSchema.plugin(mongoosePaginate)
const material = mongoose.model('material', materialSchema)

module.exports = material;
