// Gettign the Newly created Mongoose Model we just created 
var File = require('../models/file.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getFiles = async function(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var files = await File.paginate(query, options)

        // Return the todod list that was retured by the mongoose promise
        return files;

    } catch (e) {
        console.log(e)

        // return a Error message describing the reason 
        throw Error('Error while Paginating files')
    }
}

exports.createFile = async function(file) {
 

    // Creating a new Mongoose Object by using the new keyword
    var newFile = new File({

        mimeType: file.mimeType,
        originalname: file.originalname,
        FileName: file.FileName,
        FileSize : file.FileSize ,
        ImagePath : file.ImagePath,
        ThumbPath : file.ThumbPath,
        exerciseId: file.exerciseId,
        type: file.type,

    })

    try {

        // Saving the File 
        var savedFile = await newFile.save()

        return savedFile;
    } catch (e) {




        // return a Error message describing the reason     
        throw Error("Error while Creating exercise")
    }
}

exports.updateFile = async function(file) {
    var id = file._id

    console.log(file)

    try {
        //Find the old File Object by the Id

        var oldFile = await File.findById(id);
    } catch (e) {
        console.log(e)
        throw Error("Error occured while Finding the File")
    }

    // If no old File Object exists return false
    if (!oldFile) {
        return false;
    }


    //Edit the File Object
    oldFile.mimeType = file.mimeType,
    oldFile.originalname = file.originalname ,
    oldFile.FileName = file.FileName,
    oldFile.FileSize = file.FileSize,
    oldFile.ImagePath= file.ImagePath,
    oldFile.ThumbPath= file.ThumbPath,
    oldFile.exerciseId= file.exerciseId,
    oldFile.type= file.type

    console.log(oldFile)

    try {
        var savedFile = await oldFile.save()
        return savedFile;
    } catch (e) {
        throw Error("And Error occured while updating the File");
    }
}

exports.deleteFile = async function(id) {

    // Delete the exercise
    try {
        var deleted = await File.remove({
            _id: id
        })
        if (deleted.n === 0) {
            throw Error("File Could not be deleted")
        }
        return deleted
    } catch (e) {
        console.log(e);
        throw Error("Error occured while Deleting the Exercise")
    }
}