var Sport = require('../models/sport.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List


exports.getSport = async function(id){

    console.log('on est bien dans le getSport');

    try {
        var sport = await Sport.findById(id);

        return sport;

    }

    catch (e) {
        console.log(e);
        throw Error('Error while Paginating sport')

    }


}

exports.getSports = async function(query, page, limit) {


    try {
        var sports = await Sport.find()

        // Return the todod list that was retured by the mongoose promise
        return sports;

    } catch (e) {
        console.log(e)

        // return a Error message describing the reason 
        throw Error('Error while Paginating sports')
    }
}
