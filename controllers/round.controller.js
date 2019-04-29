// Accessing the Service that we just created

var roundService = require('../services/rounds.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getRounds = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;
    try {

        var rounds = await roundService.getRounds({}, page, limit)

        // Return the rounds list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({
            status: 200,
            data: rounds,
            message: "Succesfully rounds Recieved"
        });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
}


exports.getRound = async function (req, res, next){

     var id = req.params.id;


    try {

        var round = await roundService.getRound(id);

        return res.status(200).json({
            status: 200,
            data: round,
            message: "Succesfully round Recieved"

        });


    } catch (e)

    {

        return res.status(400).json({
            status: 400,
            message: e.message
        });



    }


}

exports.createRound = async function(req, res, next) {

    // Req.Body contains the form submit values.

    var round = {

        title : req.body.params.title,
        type : req.body.params.type,
        exercisesNumber : req.body.params.exercisesNumber,
        drillsDuration : req.body.params.drillsDuration,
        restDuration : req.body.params.restDuration,
        repeat:req.body.params.repeat,
        exercisesId : req.body.params.exercisesId,
        exercisesAlternatives :req.body.params.exercisesAlternatives,       
        exercisesMainUser :req.body.params.exercisesMainUser,       

    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdMaterial = await roundService.createRound(round)
        return res.status(201).json({
            status: 201,
            data: createdRound,
            message: "Succesfully Created round"
        })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: "round Creation was Unsuccesfull :"+e
        })
    }
}

exports.updateRound = async function(req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        })
    }

    var id = req.body._id;

    console.log(req.body)

    var round = {
        id,
        title: req.body.title ? req.body.title : null,
        type: req.body.type ? req.body.type : null,
        exercisesNumber: req.body.exercisesNumber ? req.body.exercisesNumber : null,
        drillsDuration: req.body.drillsDuration ? req.body.drillsDuration : null,
        restDuration: req.body.restDuration ? req.body.restDuration : null,
        repeat: req.body.repeat ? req.body.repeat : null,
        exercisesId: req.body.exercisesId ? req.body.exercisesId : null,
        exercisesAlternatives: req.body.exercisesAlternatives ? req.body.exercisesAlternatives : null,
        exercisesMainUser: req.body.exercisesMainUser ? req.body.exercisesMainUser : null,

    }

    try {
        var updatedRound = await roundService.updateRound(round)
        return res.status(200).json({
            status: 200,
            data: updatedRound,
            message: "Succesfully Updated Tod"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }
}

exports.removeRound = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await roundService.deleteRound(id)
        return res.status(204).json({
            status: 204,
            message: "Succesfully round Deleted"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        })
    }

}