var express = require('express')

var router = express.Router()

var materialTypeController = require('../../controllers/materialType.controller');

router.get('/', materialTypeController.getMaterialTypes)
router.get('/:id', materialTypeController.getMaterialType)
// router.post('/', sportController.createRound)
// router.put('/:id', sportController.updateRound)
// router.delete('/:id',sportController.removeRound)

module.exports = router;
