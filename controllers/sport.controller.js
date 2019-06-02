var sportService = require('../services/sports.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getSports = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;
    try {

        var sports = await sportService.getSports({}, page, limit)

        // Return the sports list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({
            status: 200,
            data: sports,
            message: "Succesfully sports Recieved"
        });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
}


exports.getSport = async function (req, res, next){

     var id = req.params.id;


    try {

        var sport = await sportService.getSport(id);

        return res.status(200).json({
            status: 200,
            data: sport,
            message: "Succesfully sport Recieved"

        });


    } catch (e)

    {

        return res.status(400).json({
            status: 400,
            message: e.message
        });



    }


}



