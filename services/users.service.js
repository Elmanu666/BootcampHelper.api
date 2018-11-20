var User = require('../models/user.model')


_this=this;


exports.getUsers = async function(query, page, limit){

	  try {
        var users = await User.find()

       var usersWtPssw =  users.map(usr=> {
       		usr.password = '';
   			return usr
   		});


        // Return the todod list that was retured by the mongoose promise
        return usersWtPssw;

    } catch (e) {
        console.log(e)

        // return a Error message describing the reason 
        throw Error('Error while Paginating users')
    }

}


exports.getUser = async function(id){

    console.log(id);

    try {
        var user = await User.findById(id);

        return user;

    }

    catch (e) {
        throw Error('Error while Paginating user')

    }


}

exports.createUser = async function(user) {
    console.log(user);

    // Creating a new Mongoose Object by using the new keyword
    var newUser = new User({

    username: user.username,
    password: user.password,
    name: user.name,
    familyName: user.familyName,

    dateOfBirth: user.dateOfBirth,
    sex: user.sex,
    weigth: user.weigth,
    height: user.height,



    })

    try {

        // Saving the user 
        var savedUser = await newUser.save()

        return savedUser;
    } catch (e) {

        console.log('erreur mongoose')
        console.log(e)


        // return a Error message describing the reason     
        throw Error("Error while Creating user :"+e)
    }
}

exports.deleteUser = async function(id){
    try {
        var deleted = await User.remove({
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

exports.updateUser = async function(user){
    var id = user["_id"];

    console.log('dans le service user, valeur de l id :'+id);

    try {
        //Find the old session Object by the Id

        var oldUser = await User.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the session"+e)
    }

    // If no old session Object exists return false
    if (!oldUser) {
        return false;
    }

    oldUser.username = user.username;
    oldUser.password = user.password;
    oldUser.name = user.name;
    oldUser.familyName = user.familyName;
    oldUser.dateOfBirth = user.dateOfBirth;
    oldUser.sex = user.sex;
    oldUser.weigth = user.weigth;
    oldUser.height = user.height;



        

    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the session "+e);
    }


}
