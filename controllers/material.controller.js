// Accessing the Service that we just created

var materialService = require('../services/materials.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getMaterials = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var materials = await materialService.getMaterials({}, page, limit)

        // Return the materials list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({
            status: 200,
            data: materials,
            message: "Succesfully materials Recieved"
        });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
}

exports.createMaterial = async function(req, res, next) {

    // Req.Body contains the form submit values.

    var material = {

        title: req.body.title,
        description: req.body.description,
        weigth: req.body.weigth,
        length: req.body.length,
        strength: req.body.strength,
        picture: req.body.picture,

    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdMaterial = await materialService.createMaterial(material)
        return res.status(201).json({
            status: 201,
            data: createdMaterial,
            message: "Succesfully Created material"
        })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: "material Creation was Unsuccesfull"
        })
    }
}

exports.updateMaterial = async function(req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        })
    }

    var id = req.body._id;

    console.log(req.body)

    var material = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.title ? req.body.description : null,
        weigth: req.body.title ? req.body.weigth : null,
        length: req.body.title ? req.body.length : null,
        strength: req.body.title ? req.body.strength : null,
        picture: req.body.picture ? req.body.picture : null,

    }

    try {
        var updatedMaterial = await materialService.updateMaterial(material)
        return res.status(200).json({
            status: 200,
            data: updatedMaterial,
            message: "Succesfully Updated Tod"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }
}

exports.removeMaterial = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await materialService.deleteMaterial(id)
        return res.status(204).json({
            status: 204,
            message: "Succesfully material Deleted"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        })
    }

}