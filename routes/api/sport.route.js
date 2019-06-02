var express = require('express')

var router = express.Router()

var sportController = require('../../controllers/sport.controller');

router.get('/', sportController.getSports)
router.get('/:id', sportController.getSport)
// router.post('/', sportController.createRound)
// router.put('/:id', sportController.updateRound)
// router.delete('/:id',sportController.removeRound)

module.exports = router;
