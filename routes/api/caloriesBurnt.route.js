var express = require('express')

var router = express.Router()

var caloriesBurntController = require('../../controllers/caloriesBurnt.controller');

router.get('/', caloriesBurntController.getCaloriesBurnts)
router.get('/:id', caloriesBurntController.getCaloriesBurnt)
router.post('/', caloriesBurntController.createCaloriesBurnt)
router.post('/several/', caloriesBurntController.createCaloriesBurnts)
router.put('/:id', caloriesBurntController.updateCaloriesBurnt)
router.delete('/:id',caloriesBurntController.removeCaloriesBurnt)

module.exports = router;