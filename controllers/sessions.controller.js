// Accessing the Service that we just created

var sessionService = require('../services/sessions.service')
var dateService = require ('../services/date.service')
var roundServices = require('../services/rounds.service');
var caloriesBurntServices = require('../services/caloriesBurnts.service');

// Saving the context of this module inside the _the variable

_this = this


exports.getRoundId = async function (round){

    var roundIds = new Array();

    for (var i =0 ; i < round.length; i++){

        if (round[i]._id){
            var m = await roundServices.updateRound(round[i]);
            roundIds.push(m._id);  

        }
        else {
            var m = await roundServices.createRound(round[i]);
            roundIds.push(m._id);

        }


    }

  
    return roundIds;
}


exports.getCaloriesBurntId = async function (caloriesBurnt){

    var caloriesBurntIds = new Array();

    for (var i =0 ; i < caloriesBurnt.length; i++){

        if (caloriesBurnt[i]._id){
            var m = await roundServices.updateCaloriesBurnt(caloriesBurnt[i]);
            caloriesBurntIds.push(m._id);  

        }
        else {
            var m = await roundServices.createCaloriesBurnt(caloriesBurnt[i]);
            caloriesBurntIds.push(m._id);

        }



    }

  
    return caloriesBurntIds;
}

exports.getAttendeesId = async function (data){
    console.log(data);
    var attendeesIds = new Array();

    for (var v=0; v<= data.length; v++){

        attendeesIds.push(data._id);

        }



    return attendeesIds;
}

// Async Controller function to get the To do List

exports.getSession = async function(req, res, next){

        var id = req.params.id;
        console.log(id);


    try {

        var session = await sessionService.getSession(id);

        return res.status(200).json({
            status: 200,
            data: session,
            message: "Succesfully sessions Recieved"

        });


    } catch (e)

    {

        return res.status(400).json({
            status: 400,
            message: e.message
        });



    }


}

exports.getSessions = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10
    console.log(req.query);

    var query = {};



    var qStartDate, qEndDate;

    console.log(new Date (req.query.startDate));

    var date

    

    // req.query.fromDate ? qStarDate = {plannedDate : {$gte : dateService.stringToDate(req.query.fromDate)}} : '';
    // req.query.toDate ? qEndDate = {plannedDate : {$lte : dateService.stringToDate(req.query.toDate)}} : '';
    req.query.toDate && req.query.fromDate ? query = {plannedDate : {$gte : dateService.stringToDate(req.query.fromDate), $lte : dateService.stringToDate(req.query.toDate)}} : '';
//    query = {qStarDate, qEndDate};
//    query = {qStarDate};



    try {

        var sessions = await sessionService.getSessions(query, page, limit)

        // Return the sessions list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({
            status: 200,
            data: sessions,
            message: "Succesfully sessions Recieved"
        });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
}

exports.createSession = async function(req, res, next) {

    var caloriesBurntId, roundId;

//    req.body.caloriesBurntId ?  caloriesBurntId = await exports.getCaloriesBurntId(req.body.caloriesBurntId) : caloriesBurntId = '';
    req.body.round ?  roundId = await exports.getRoundId(req.body.round) : roundId = '';

  


    // if (req.body.attendees){
    //         var attendeesId = await exports.getAttendeesId(req.body.attendees);


    // }
    // else {var attendeesId = ''};

    var session1 = {

        description: req.body.description,
        plannedDate: req.body.plannedDate,
        executionDate :req.body.executionDate,
        executionStart :req.body.executionStart,
        executionEnd :req.body.executionEnd,
        Status: req.body.Status,
        attendees : req.body.attendees,
        plannedDate: req.body.plannedDate,
        round: roundId,
        caloriesBurntId : req.body.caloriesBurnt,
        deleted: false,
        executed: false,

        

    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdSession = await sessionService.createSession(session1)
        return res.status(201).json({
            status: 201,
            data: createdSession,
            message: "Succesfully Created session"
        })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: "session Creation was Unsuccesfull "+e
        })
    }
}

exports.updateSession = async function(req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        })
    }

    var _id = req.body._id;


    // if (caloriesBurnt.length >0){
    //     var caloriesBurntId = await exports.getCaloriesBurntId(req.body.caloriesBurnt);
    // }

    if (req.body.round.length > 0){

         var roundId = await exports.getRoundId(req.body.round);


    }

    var session = {
        _id,
        plannedDate : req.body.plannedDate ? req.body.plannedDate : null, 
        executionDate :req.body.executionDate ? req.body.executionDate : null,
        executionStart :req.body.executionStart ? req.body.executionStart : null,
        executionEnd :req.body.executionEnd ? req.body.executionEnd : null,
        round: roundId ? roundId : null,

        description: req.body.description ? req.body.description : 'Default value',
    
        Status: req.body.Status ? req.body.Status : null,
        deleted : req.body.deleted ? req.body.deleted : false,
        executed : req.body.executed ? req.body.executed : false,
        attendees : req.body.attendees ? req.body.attendees : false,
        attendees : req.body.attendees ? req.body.attendees : false,
        caloriesBurntId : req.body.caloriesBurntId ? req.body.caloriesBurntId : null,

    }



    try {
        var updatedSession = await sessionService.updateSession(session)
        return res.status(200).json({
            status: 200,
            data: updatedSession,
            message: "Succesfully Updated Session"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }
}

exports.removeSession = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await sessionService.deleteSession(id)
        return res.status(204).json({
            status: 204,
            message: "Succesfully session Deleted"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        })
    }

}

