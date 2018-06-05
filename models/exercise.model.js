
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var exerciseSchema = new mongoose.Schema({
    title: String,
    description: String,
    details :{ 
    	cardio : Boolean,
    	muscu : Boolean,
    	balance : Boolean,
    	bodyPart : [String],
    	} ,
    media : {
    	img : String,
    	video : String,
    	gif : String,

    },
    material : [String],
    hidden: Boolean,
})

exerciseSchema.plugin(mongoosePaginate)
const exercise = mongoose.model('exercise', exerciseSchema)

module.exports = exercise;
