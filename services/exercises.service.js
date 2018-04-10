// Gettign the Newly created Mongoose Model we just created 
var exercise = require('../models/exercise.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getExercises = async function(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var exercises = await exercise.paginate(query, options)

        // Return the todod list that was retured by the mongoose promise
        return exercises;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating exercises')
    }
}

exports.createExercise = async function(exercise) {

    // Creating a new Mongoose Object by using the new keyword
    var newExercise = new exercise({

        title: exercise.title,
        description: exercise.description,
        type: exercise.type,
        media: {
            img: exercise.img,
            video: exercise.video,
            gif: exercise.gif,

        },
        material: exercise.material,
        hidden: exercise.hidden,



    })

    try {

        // Saving the exercise 
        var savedExercise = await newExercise.save()

        return savedExercise;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating exercise")
    }
}

exports.updateExercise = async function(exercise) {
    var id = exercise.id

    try {
        //Find the old exercise Object by the Id

        var oldExercise = await exercise.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Exercise")
    }

    // If no old exercise Object exists return false
    if (!oldExercise) {
        return false;
    }

    console.log(oldexercise)

    //Edit the exercise Object
    oldExercise.title = exercise.title
    oldExercise.description = exercise.description


    oldExercise.title= exercise.title
        oldExercise.description = exercise.description
        oldExercise.type = exercise.type
        oldExercise.media = {
            img: exercise.img,
            video: exercise.video,
            gif: exercise.gif,

        }
        oldExercise.material= exercise.material
        oldExercise.hidden= exercise.hidden


        console.log(oldexercise)

    try {
        var savedexercise = await oldexercise.save()
        return savedexercise;
    } catch (e) {
        throw Error("And Error occured while updating the Exercise");
    }
}

exports.deleteExercise = async function(id) {

    // Delete the exercise
    try {
        var deleted = await exercise.remove({
            _id: id
        })
        if (deleted.result.n === 0) {
            throw Error("Exercise Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error occured while Deleting the Exercise")
    }
}