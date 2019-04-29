
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
//const exercise = require('./exercise.model'); 
const Schema =mongoose.Schema;



// var sessionSchema = new mongoose.Schema({
var sessionSchema = Schema({

    description: String,
    plannedDate: Date,
    executionDate :Date,
    executionStart : Date,
    executionEnd : Date,
    Status: String,
    attendees : [{type: Schema.Types.ObjectId, ref: 'User'}],
    round :[{type: Schema.Types.ObjectId, ref: 'Round'}],
    caloriesBurntId: [{type: Schema.Types.ObjectId, ref: 'CaloriesBurnt'}],
    deleted: Boolean,
    executed: Boolean,
  //   	{	
  //   	title : String,
		// exercisesNumber : Number,
		// drillsDuration : Number,
		// restDuration : Number,
  //   	repeat:Number,
		// exercises : [ {
		// 				title: String,
		// 			    description: String,
		// 			    params : 
		// 			    { 
		// 			    	cardio : Boolean,
		// 			    	muscu : Boolean,
		// 			    	balance : Boolean,
		// 			    	warmup : Boolean,
		// 			    	bodyPart : [String],
		// 			    	} ,
		// 			    media : {
		// 			    	img : String,
		// 			    	video : String,
		// 			    	gif : String,

		// 			    	},
		// 			    material : [String],
		// 			    hidden: Boolean, 
		// 				}
		// 		],
		// exercises : [{type: Schema.Types.ObjectId, ref: 'exercise'}],
		// exercisesAlternatives :[{
		// 	users : [String],
		// 	exercisesId : 	 { type: [Schema.Types.ObjectId], ref: 'exercise' }
						// [
						// title: String,
					 //    description: String,
					 //    params : 
					 //    { 
					 //    	cardio : Boolean,
					 //    	muscu : Boolean,
					 //    	balance : Boolean,
					 //    	warmup : Boolean,
					 //    	bodyPart : [String],
					 //    	} ,
					 //    media : {
					 //    	img : String,
					 //    	video : String,
					 //    	gif : String,

					 //    	},
					 //    material : [String],
					 //    hidden: Boolean, 
						// }
			// 	,


			// }],
		// exercisesMainUser:[String]

			
		
		// }






})

sessionSchema.plugin(mongoosePaginate)
const session = mongoose.model('session', sessionSchema)

module.exports = session;
