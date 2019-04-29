// Gettign the Newly created Mongoose Model we just created 
var Round = require('../models/round.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List


exports.getRound = async function(id){

    console.log('on est bien dans le getRound');

    try {
        var round = await Round.findById(id).populate('exercisesId').populate({path : 'exercisesAlternatives.usersId', ref : 'User'}).populate({path : 'exercisesAlternatives.exercisesAltId', ref : 'Exercise'});

        return round;

    }

    catch (e) {
        console.log(e);
        throw Error('Error while Paginating round')

    }


}




exports.getRounds = async function(query, page, limit) {

    // Options setup for the mongoose paginate

    page = parseInt(page, 10)
    var options = {
        page,
        limit
    }


    // Try Catch the awaited promise to handle the error 

    // try {
    //     var rounds = await Round.paginate(query, options)

    //     console.log('retour de mongoose');
    //     console.log(Rounds);

    //     // Return the todod list that was retured by the mongoose promise
    //     return Rounds;

    // } catch (e) {
    //     console.log(e)

    //     // return a Error message describing the reason 
    //     throw Error('Error while Paginating Rounds')
    // }


    try {
        var rounds = await Round.find().populate('exercisesId')

        // Return the todod list that was retured by the mongoose promise
        return rounds;

    } catch (e) {
        console.log(e)

        // return a Error message describing the reason 
        throw Error('Error while Paginating rounds')
    }
}

exports.createRound = async function(round) {

    var exercisesIdext = round.exercisesId.map(x=> x._id);

    // Creating a new Mongoose Object by using the new keyword
    var newRound = new Round({
        title : round.title ? round.title : '',
        type : round.type,
        exercisesNumber : round.exercisesNumber,
        drillsDuration : round.drillsDuration,
        restDuration : round.restDuration,
        repeat:round.repeat,
        exercisesId : exercisesIdext,
        exercisesAlternatives :round.exercisesAlternatives,       
        exercisesMainUser :round.exercisesMainUser,       




    })

    try {

        // Saving the round 
        var savedRound = await newRound.save()

        return savedRound;
    } catch (e) {

        console.log('erreur mongoose')
        console.log(e)


        // return a Error message describing the reason     
        throw Error("Error while Creating round")
    }
}

exports.updateRound = async function(round) {
    var id = round._id

    try {
        //Find the old round Object by the Id

        var oldRound = await Round.findById(id);
    } catch (e) {
        console.log(e)
        throw Error("Error occured while Finding the Round")
    }

    // If no old round Object exists return false
    if (!oldRound) {
        return false;
    }
    console.log('ancienne valeure :')
    console.log(oldRound)

    //Edit the round Object
        oldRound.title = round.title;
        oldRound.type = round.type;
        oldRound.exercisesNumber = round.exercisesNumber;
        oldRound.drillsDuration = round.drillsDuration;
        oldRound.restDuration = round.restDuration;
        oldRound.repeat=round.repeat;
        oldRound.exercisesId = round.exercisesId;
        oldRound.exercisesAlternatives =round.exercisesAlternatives;
        oldRound.exercisesMainUser =round.exercisesMainUser;


    console.log(oldRound)

    try {
        var savedRound = await oldRound.save()
        return savedRound;
    } catch (e) {
        throw Error("And Error occured while updating the Round");
    }
}

exports.deleteRound = async function(id) {

    // Delete the round
    try {
        var deleted = await Round.remove({
            _id: id
        })
        if (deleted.n === 0) {
            throw Error("Round Could not be deleted")
        }
        return deleted
    } catch (e) {
        console.log(e);
        throw Error("Error occured while Deleting the Round")
    }
}
