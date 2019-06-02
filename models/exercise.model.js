
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;


const ExerciseSchema = Schema({
    title: String,
    description: String,
    details :{ 
    	cardio : Boolean,
    	muscu : Boolean,
    	balance : Boolean,
    	warmup : Boolean,
    	bodyPart : [String],
    	} ,
    media : {
    	img : String,
    	video : String,
    	gif : String,

    },
    material : [{type: Schema.Types.ObjectId, ref: 'material'}],
    sports : [{type: Schema.Types.ObjectId, ref: 'sport'}],
    materialType : [{type: Schema.Types.ObjectId, ref: 'materialType'}],
    hidden: Boolean,
})

ExerciseSchema.plugin(mongoosePaginate)
const exercise = mongoose.model('Exercise', ExerciseSchema)

module.exports = exercise;
