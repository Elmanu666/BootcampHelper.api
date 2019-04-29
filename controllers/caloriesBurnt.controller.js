var caloriesBurntService = require('../services/caloriesBurnts.service')
_this = this


// Async Controller function to get the To do List

exports.getCaloriesBurnts = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;
    try {

        var caloriesBurnt = await caloriesBurntService.getCaloriesBurnts({}, page, limit)

        // Return the caloriesBurnt list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({
            status: 200,
            data: caloriesBurnt,
            message: "Succesfully caloriesBurnt Recieved"
        });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
}


exports.getCaloriesBurnt = async function (req, res, next){

     var id = req.params.id;


    try {

        var caloriesBurnt = await caloriesBurntService.getCaloriesBurnt(id);

        return res.status(200).json({
            status: 200,
            data: caloriesBurnt,
            message: "Succesfully caloriesBurnt Recieved"

        });


    } catch (e)

    {

        return res.status(400).json({
            status: 400,
            message: e.message
        });



    }


}

exports.createCaloriesBurnt = async function(req, res, next) {

    // Req.Body contains the form submit values.


    var caloriesBurnt = {

        userId : req.body.params.userId ,
        SessionId : req.body.params.SessionId,
        amount : req.body.params.amount ? req.body.params.SessionId : 0 ,
     

    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdMaterial = await caloriesBurntService.createCaloriesBurnt(caloriesBurnt)
        return res.status(201).json({
            status: 201,
            data: createdCaloriesBurnt,
            message: "Succesfully Created caloriesBurnt"
        })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: "caloriesBurnt Creation was Unsuccesfull :"+e
        })
    }
}

exports.createCaloriesBurnts = async function(req, res, next) {

    // Req.Body contains the form submit values.


    var caloriesBurnt = req.body.map(x => {

        var rObj ={};
        rObj.userId = x.userId;
        rObj.sessionId = x.sessionId;
        rObj.amount = x.amount;
        return rObj;
    })

    console.log('caloriesBurnt');
    console.log(caloriesBurnt);

    // var caloriesBurnt = {

    //     userId : req.body.params.userId ,
    //     SessionId : req.body.params.SessionId,
    //     amount : req.body.params.amount ? req.body.params.SessionId : 0 ,
     

    // }


            try {

            // Calling the Service function with the new object from the Request Body

            var createdCaloriesBurnt = await caloriesBurntService.createCaloriesBurnts(caloriesBurnt);
            return res.status(201).json({
                status: 201,
                data: createdCaloriesBurnt,
                message: "Succesfully Created caloriesBurnt"
             })


            } catch (e) {

            return res.status(400).json({
                status: 400,
                message: "caloriesBurnt Creation was Unsuccesfull :"+e
            })


            }



}

exports.updateCaloriesBurnt = async function(req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        })
    }

    var id = req.body._id;

    console.log(req.body)

    var caloriesBurnt = {
        id,
        userId: req.body.userId ? req.body.userId : null,
        SessionId: req.body.SessionId ? req.body.SessionId : null,
        amount: req.body.amount ? req.body.amount : null, 

    }

    try {
        var updatedCaloriesBurnt = await caloriesBurntService.updateCaloriesBurnt(caloriesBurnt)
        return res.status(200).json({
            status: 200,
            data: updatedCaloriesBurnt,
            message: "Succesfully Updated"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }
}

exports.removeCaloriesBurnt = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await caloriesBurntService.deleteCaloriesBurnt(id)
        return res.status(204).json({
            status: 204,
            message: "Succesfully caloriesBurnt Deleted"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        })
    }

}