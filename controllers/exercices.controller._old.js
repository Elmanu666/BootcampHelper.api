// Accessing the Service that we just created

var exerciseService = require('../services/exercises.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getExercises = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var exercises = await exerciseService.getExercises({}, page, limit)
        console.log(exercises);

        // Return the exercises list with the appropriate HTTP Status Code and Message.
        exercises.total = exercises.total +1;

        return res.status(200).json({
            status: 200,
            data: exercises,
            message: "Succesfully exercises Recieved"
        });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
}

exports.createExercise = async function(req, res, next) {

    // Req.Body contains the form submit values.

    console.log('dans le crearte exercise');
    console.log(req);

   



    var exercise = {
        title: req.body.title ? req.body.title : '',
        description: req.body.description ? req.body.description : 'Default description',
        params: {
            cardio: req.body.params.cardio ? req.body.params.cardio : false,
            muscu: req.body.params.muscu ? req.body.params.muscu : false,
            balance: req.body.params.balance ? req.body.params.balance : false,
            warmup: req.body.params.warmup ? req.body.params.warmup :  false,
            bodyPart: [req.body.params.bodyPart],
        },
        media: {
            img: req.body.media.img ? req.body.media.img : '',
            video: req.body.media.video ? req.body.media.video : '',
            gif: req.body.media.gif ? req.body.media.gif: '',

        },
        material: [req.body.material],
        hidden: false,
    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdexercise = await exerciseService.createExercise(req.body)
        return res.status(201).json({
            status: 201,
            data: createdexercise,
            message: "Succesfully Created exercise"
        })
    } catch (e) {

        console.log('on est dans le catch du controller');
        console.log(e)
        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: "Unsuccesfull creation"
        })
    }
}

exports.updateExercise = async function(req, res, next) {

    // Id is necessary for the update
    console.log('controller updateExercise')
    console.log(req.body.params)
    console.log(req.body)

    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        })
    }

    var id = req.body._id;


    var exercise = {
        _id : id,
        
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        params: {
            cardio: req.body.params.cardio ? req.body.params.cardio : false,
            muscu: req.body.params.muscu ? req.body.params.muscu : false,
            balance: req.body.params.balance ? req.body.params.balance : false,
            warmup: req.body.params.warmup ? req.body.params.warmup : false,
            bodyPart: req.body.params.bodyPart ? req.body.params.bodyPart : null,
        },
        media: {
            img: req.body.media.img ? req.body.media.img : null,
            video: req.body.media.video ? req.body.media.video : null,
            gif: req.body.media.gif ? req.body.media.gif : null,

        },
        material: [req.body.material] ? [req.body.material] : null,
        hidden: false,
    }

    console.log('valeur qui vont être mise à jour');
    console.log()

    try {
        var updatedexercise = await exerciseService.updateExercise(exercise)
        return res.status(200).json({
            status: 200,
            data: updatedexercise,
            message: "Succesfully Updated"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }
}

exports.removeExercise = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await exerciseService.deleteExercise(id)
        return res.status(204).json({
            status: 204,
            message: "Succesfully exercise Deleted"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        })
    }

}