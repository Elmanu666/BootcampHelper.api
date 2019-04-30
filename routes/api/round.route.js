var express = require('express')

var router = express.Router()

var roundController = require('../../controllers/round.controller');

router.get('/', roundController.getRounds)
router.get('/:id', roundController.getRound)
router.post('/', roundController.createRound)
router.put('/:id', roundController.updateRound)
router.delete('/:id',roundController.removeRound)

module.exports = router;
