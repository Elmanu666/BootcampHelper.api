var express = require('express')

var router = express.Router()

var exercisesController = require('../../controllers/exercises.controller');

router.get('/', exercisesController.getExercises)
router.get('/:id', exercisesController.getExercises)
router.post('/', exercisesController.createExercise)
router.put('/:id', exercisesController.updateExercise)
router.delete('/:id',exercisesController.removeExercise)

module.exports = router;
