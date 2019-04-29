var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema =mongoose.Schema;

var RoundSchema = Schema({	
	title : String,
	type : String,
	exercisesNumber : Number,
	drillsDuration : Number,
	restDuration : Number,
	repeat:Number,
//	usersId : [{type: Schema.Types.ObjectId, ref: 'User'}],
	exercisesId : [{type: Schema.Types.ObjectId, ref: 'Exercise'}],
	exercisesAlternatives :[{
		usersId : [{type: Schema.Types.ObjectId, ref: 'User'}],
		exercisesAltId : 	 [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
	}],
	exercisesMainUser : [{type: Schema.Types.ObjectId, ref: 'User'}],

})

RoundSchema.plugin(mongoosePaginate);
const Round = mongoose.model('Round', RoundSchema);

module.exports = Round;