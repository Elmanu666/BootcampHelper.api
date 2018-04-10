
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var sessionSchema = new mongoose.Schema({
    plannedDate: Date,
    doneDate: Date,
    part :[{ 
    	numbOfExercices : Number,
    	drillsDuration : Number,
    	restDuration : Number,
        repeatNumber : Number,
        exercises : [],
    	}] 
})

sessionSchema.plugin(mongoosePaginate)
const session = mongoose.model('session', sessionSchema)

module.exports = session;
