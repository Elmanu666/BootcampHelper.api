var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
//const exercise = require('./exercise.model'); 
const Schema =mongoose.Schema;


var CaloriesBurntSchema = Schema({

		userId : {type: Schema.Types.ObjectId, ref: 'User'}, 
		sessionId : {type: Schema.Types.ObjectId, ref: 'session'},
		amount : Number 

})

CaloriesBurntSchema.plugin(mongoosePaginate)
const CaloriesBurnt = mongoose.model('CaloriesBurnt', CaloriesBurntSchema)

module.exports = CaloriesBurnt;