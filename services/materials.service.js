// Gettign the Newly created Mongoose Model we just created 
var material = require('../models/material.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getMaterials = async function(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var materials = await material.paginate(query, options)

        // Return the todod list that was retured by the mongoose promise
        return materials;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating materials')
    }
}

exports.createMaterial = async function(material) {

    // Creating a new Mongoose Object by using the new keyword
    var newMaterial = new material({
        title: material.title,
        description: material.description,
        weigth: material.weigth,
        length: material.length,
        strength: material.strength,
        picture: material.picture



    })

    try {

        // Saving the material 
        var savedMaterial = await newMaterial.save()

        return savedMaterial;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating material")
    }
}

exports.updateMaterial = async function(material) {
    var id = material.id

    try {
        //Find the old material Object by the Id

        var oldMaterial = await material.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the material")
    }

    // If no old material Object exists return false
    if (!oldmaterial) {
        return false;
    }

    console.log(oldmaterial)

    //Edit the material Object
    oldMaterial.title = material.title
    oldMaterial.description = material.description
    oldMaterial.weigth = material.weigth
    oldMaterial.length = material.length
    oldMaterial.strength = material.strength
    oldMaterial.picture = material.picture


    console.log(oldMaterial)

    try {
        var savedMaterial = await oldMaterial.save()
        return savedMaterial;
    } catch (e) {
        throw Error("And Error occured while updating the material");
    }
}

exports.deleteMaterial = async function(id) {

    // Delete the material
    try {
        var deleted = await material.remove({
            _id: id
        })
        if (deleted.result.n === 0) {
            throw Error("material Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error occured while Deleting the material")
    }
}