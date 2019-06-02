var MaterialType = require('../models/materialType.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List


exports.getMaterialType = async function(id){

    console.log('on est bien dans le getMaterialType');

    try {
        var materialType = await MaterialType.findById(id);

        return materialType;

    }

    catch (e) {
        console.log(e);
        throw Error('Error while Paginating materialType')

    }


}

exports.getMaterialTypes = async function(query, page, limit) {


    try {
        var materialTypes = await MaterialType.find()

        // Return the todod list that was retured by the mongoose promise
        return materialTypes;

    } catch (e) {
        console.log(e)

        // return a Error message describing the reason 
        throw Error('Error while Paginating sports')
    }
}
