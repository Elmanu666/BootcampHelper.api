// Gettign the Newly created Mongoose Model we just created 
var Session = require('../models/session.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List

exports.getSession = async function(id){

    console.log(id);

    try {
        var session = await Session.findById(id);

        return session;

    }

    catch (e) {
        throw Error('Error while Paginating sessions')

    }


}
exports.getSessions = async function(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    console.log('query :');
    console.log(query);


    // Try Catch the awaited promise to handle the error 

    try {
        var sessions = await Session.paginate(query, options)

        // Return the todod list that was retured by the mongoose promise
        return sessions;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating sessions'+e)
    }
}

exports.createSession = async function(session) {

    console.log('on est dans le createSession')

    // Creating a new Mongoose Object by using the new keyword
    var newSession = new Session({

        description: session.description,
        plannedDate: session.plannedDate,
        executionDate : session.executionDate,
        Status : session.Status,
        doneDate: session.doneDate,
        attendees: session.attendees,
        round: session.round,
        deleted: false,
        executed: false,

    })

    try {
        console.log('on est dans le try')

        // Saving the session 
        var savedSession = await newSession.save()

        return savedSession;
    } catch (e) {
        console.log('erreur create session service')
        console.log(e)
        // return a Error message describing the reason     
        throw Error("Error while Creating session")
    }
}

exports.updateSession = async function(session) {
    var id = session["_id"];

    console.log('dans le service session, valeur de l id :'+id);

    try {
        //Find the old session Object by the Id

        var oldSession = await Session.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the session"+e)
    }

    // If no old session Object exists return false
    if (!oldSession) {
        return false;
    }

    console.log(oldSession);
    console.log('structure recu');
    console.log(session);

    //Edit the session Object

    oldSession.description = session.description;

    oldSession.plannedDate = session.plannedDate
    oldSession.executionDate = session.executionDate
    oldSession.Status = session.Status
    oldSession.deleted = session.eleted
    oldSession.executed = session.executed
    oldSession.attendees = session.attendees
    oldSession.round = session.round


   



        console.log(oldSession)

    try {
        var savedSession = await oldSession.save()
        return savedSession;
    } catch (e) {
        throw Error("And Error occured while updating the session "+e);
    }
}

exports.deleteSession = async function(id) {

    // Delete the session
    try {
        var deleted = await session.remove({
            _id: id
        })
        if (deleted.result.n === 0) {
            throw Error("session Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error occured while Deleting the session")
    }
}