var express = require('express')

var router = express.Router()

var exercisesController = require('../../controllers/exercises.controller');

router.get('/', exercisesController.getExercises)
router.post('/', exercisesController.createExercise)
router.put('/', exercisesController.updateExercise)
router.delete('/:id',exercisesController.removeExercise)

module.exports = router;
