
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var materialSchema = new mongoose.Schema({
    title: String,
    description: String,
    weigth : Number,
    length : Number,
    size : String,
    strength : String,
    type: String,
    quantity: Number,

})

materialSchema.plugin(mongoosePaginate)
const material = mongoose.model('material', materialSchema)

module.exports = material;
