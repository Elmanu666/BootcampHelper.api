var mongoose = require('mongoose')
const Schema = mongoose.Schema;


const materialTypeSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    
})


const materialType = mongoose.model('materialType', materialTypeSchema)

module.exports = materialType;
