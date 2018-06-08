// Accessing the Service that we just created

var fileService = require('../services/files.service')
var multer = require('multer');

// set the directory for the uploads to the uploaded to
var DIR = './public/uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({
    dest: DIR
}).single('file');
/* GET home page. */


// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getFiles = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var files = await fileService.getFiles({'exerciseId' : req.query.exerciseId }, page, limit)
        console.log(files);


        // Return the files list with the appropriate HTTP Status Code and Message.
        files.total = files.total + 1;

        return res.status(200).json({
            status: 200,
            data: files,
            message: "Succesfully files Recieved"
        });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
}

exports.createFile = async function(req, res, next) {

    // save the file

    upload(req, res, function(err) {


        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(201).send("an Error occured")
        } else {
//            console.log(req);
        
                    let temFilePath = req.file.path.split('public/');
                    req.file.path =  temFilePath[1];


            var fileData = {

                mimeType: req.file.mimetype,
                originalname: req.file.originalname,
                FileName: req.file.filename,
                FileSize: req.file.size,
                ImagePath: req.file.path,
                ThumbPath: '',
                exerciseId : req.body.ExerciseId,
                type: req.body.type,

                
            }


            try {

                // Calling the Service function with the new object from the Request file

                // var createdFile = await fileService.createFile(file)
                var createdFile = fileService.createFile(fileData)
                return res.status(201).json({
                    status: 201,
                    data: createdFile,
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


    });


}

exports.updateFile = async function(req, res, next) {

    // Id is necessary for the update
    console.log('controller updateFile')
    console.log(req.body)

    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        })
    }

    var id = req.body._id;


    var file = {
        _id: id,

        title: req.body.title ? req.body.title : null,
        FileName: req.body.description ? req.body.description : null,
        FileSize: req.body.FileSize ? eq.body.FileSize : null,
        ImagePath: req.body.ImagePath ? eq.body.ImagePath : null,
        ThumbPath: req.body.ThumbPath ? eq.body.ThumbPath : null,
        ProjectId: req.body.ProjectId ? eq.body.ProjectId : null,
        SectionId: req.body.SectionId ? eq.body.SectionId : null,
    }

    console.log('valeur qui vont être mise à jour');


    try {
        var updatedFile = await fileService.updateFile(exercise)
        return res.status(200).json({
            status: 200,
            data: updatedFile,
            message: "Succesfully Updated Tod"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }
}

exports.removeFile = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await fileService.deleteFile(id)
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