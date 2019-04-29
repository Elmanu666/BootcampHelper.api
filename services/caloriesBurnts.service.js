// Gettign the Newly created Mongoose Model we just created 
var CaloriesBurnt = require('../models/caloriesBurnt.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List


exports.getCaloriesBurnt = async function(id){

    console.log('on est bien dans le getCaloriesBurnt');

    try {
        var caloriesBurnt = await CaloriesBurnt.findById(id).populate('userId');

        return caloriesBurnt;

    }

    catch (e) {
        console.log(e);
        throw Error('Error while Paginating caloriesBurnt')

    }


}




exports.getCaloriesBurnts = async function(query, page, limit) {

    // Options setup for the mongoose paginate

    page = parseInt(page, 10)
    var options = {
        page,
        limit
    }


    // Try Catch the awaited promise to handle the error 

    // try {
    //     var caloriesBurnts = await CaloriesBurnt.paginate(query, options)

    //     console.log('retour de mongoose');
    //     console.log(CaloriesBurnts);

    //     // Return the todod list that was retured by the mongoose promise
    //     return CaloriesBurnts;

    // } catch (e) {
    //     console.log(e)

    //     // return a Error message describing the reason 
    //     throw Error('Error while Paginating CaloriesBurnts')
    // }


    try {
        var caloriesBurnts = await CaloriesBurnt.find().populate('exercisesId')

        // Return the todod list that was retured by the mongoose promise
        return caloriesBurnts;

    } catch (e) {
        console.log(e)

        // return a Error message describing the reason 
        throw Error('Error while Paginating caloriesBurnts')
    }
}

exports.createCaloriesBurnt = async function(caloriesBurnt) {
    console.log(caloriesBurnt);

    // Creating a new Mongoose Object by using the new keyword
    var newCaloriesBurnt = new CaloriesBurnt({
        userId : caloriesBurnt.userId,
        SessionId : caloriesBurnt.SessionId,
        amount : caloriesBurnt.amount,
      




    })

    try {

        // Saving the caloriesBurnt 
        var savedCaloriesBurnt = await newCaloriesBurnt.save()

        return savedCaloriesBurnt;
    } catch (e) {

        console.log('erreur mongoose')
        console.log(e)


        // return a Error message describing the reason     
        throw Error("Error while Creating caloriesBurnt")
    }
}

exports.createCaloriesBurnts = async function(caloriesBurnts) {
    console.log(caloriesBurnts);
    // Creating a new Mongoose Object by using the new keyword
    // var newCaloriesBurnt = new CaloriesBurnt({
    //     userId : caloriesBurnt.userId,
    //     SessionId : caloriesBurnt.SessionId,
    //     amount : caloriesBurnt.amount,
      




    // })

    try {

        // Saving the caloriesBurnt 
        var savedCaloriesBurnt = await CaloriesBurnt.insertMany(caloriesBurnts)

        return savedCaloriesBurnt;
    } catch (e) {

        console.log('erreur mongoose')
        console.log(e)


        // return a Error message describing the reason     
        throw Error("Error while Creating caloriesBurnt:"+e)
    }
}



exports.updateCaloriesBurnt = async function(caloriesBurnt) {
    var id = caloriesBurnt._id

    try {
        //Find the old caloriesBurnt Object by the Id

        var oldCaloriesBurnt = await CaloriesBurnt.findById(id);
    } catch (e) {
        console.log(e)
        throw Error("Error occured while Finding the CaloriesBurnt")
    }

    // If no old caloriesBurnt Object exists return false
    if (!oldCaloriesBurnt) {
        return false;
    }
    console.log('ancienne valeure :')
    console.log(oldCaloriesBurnt)

    //Edit the caloriesBurnt Object
        oldCaloriesBurnt.userId = caloriesBurnt.userId;
        oldCaloriesBurnt.SessionId = caloriesBurnt.SessionId;
        oldCaloriesBurnt.amount = caloriesBurnt.amount;


    console.log(oldCaloriesBurnt)

    try {
        var savedCaloriesBurnt = await oldCaloriesBurnt.save()
        return savedCaloriesBurnt;
    } catch (e) {
        throw Error("And Error occured while updating the CaloriesBurnt");
    }
}

exports.deleteCaloriesBurnt = async function(id) {

    // Delete the caloriesBurnt
    try {
        var deleted = await CaloriesBurnt.remove({
            _id: id
        })
        if (deleted.n === 0) {
            throw Error("CaloriesBurnt Could not be deleted")
        }
        return deleted
    } catch (e) {
        console.log(e);
        throw Error("Error occured while Deleting the CaloriesBurnt")
    }
}
