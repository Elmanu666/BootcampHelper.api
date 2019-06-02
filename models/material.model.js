var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;


var materialSchema = new mongoose.Schema({
    title: String,
    description: String,
    weigth : Number,
    length : Number,
    size : String,
    strength : String,
    type: {type: Schema.Types.ObjectId, ref: 'materialType'},
    quantity: Number,

})

materialSchema.plugin(mongoosePaginate)
const material = mongoose.model('material', materialSchema)

module.exports = material;
