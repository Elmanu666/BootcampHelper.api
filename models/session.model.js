
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
// var InnerArray = new mongoose.Schema({
//   exercises : [{
// 						title: String,
// 					    description: String,
// 					    params : 
// 					    { 
// 					    	cardio : Boolean,
// 					    	muscu : Boolean,
// 					    	balance : Boolean,
// 					    	warmup : Boolean,
// 					    	bodyPart : [String],
// 					    	} ,
// 					    media : {
// 					    	img : String,
// 					    	video : String,
// 					    	gif : String,

// 					    	},
// 					    material : [String],
// 					    hidden: Boolean, 
// 						}]
// })





var sessionSchema = new mongoose.Schema({

	
    description: String,
    plannedDate: Date,
    executionDate :Date,
    Status: String,
    attendees : [String],
    round :[
    	{	
    	title : String,
		exercisesNumber : Number,
		drillsDuration : Number,
		restDuration : Number,
    	repeat:Number,
		exercises : [ {
						title: String,
					    description: String,
					    params : 
					    { 
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
					    material : [String],
					    hidden: Boolean, 
						}
				],
		
		exercisesAlternatives :[{
			users : [String],
			exercises : 	[ {
						title: String,
					    description: String,
					    params : 
					    { 
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
					    material : [String],
					    hidden: Boolean, 
						}
				],


			}],
		exercisesMainUser:[String]

			
		
		}],

    deleted: Boolean,
    executed: Boolean,




})

sessionSchema.plugin(mongoosePaginate)
const session = mongoose.model('session', sessionSchema)

module.exports = session;
