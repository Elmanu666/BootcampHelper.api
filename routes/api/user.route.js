var express = require('express')

var router = express.Router()

// Getting the exercise Controller that we just created

var userController = require('../../controllers/user.controller');


// Map each API to the Controller FUnctions

//router.get('/', exerciseController.getExercises)

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/signin', userController.login)
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.removeUser)

//router.put('/:id', exerciseController.updateExercise)

//router.delete('/:id',exerciseController.removeExercise)


// Export the Router

module.exports = router;