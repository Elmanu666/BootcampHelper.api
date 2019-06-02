var mongoose = require('mongoose')
const Schema = mongoose.Schema;


const SportSchema = Schema({
    _id: Schema.Types.ObjectId,
    name : String,


})


const sport = mongoose.model('sport', SportSchema)

module.exports = sport;
