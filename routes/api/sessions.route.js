var express = require('express')

var router = express.Router()

var sessionsController = require('../../controllers/sessions.controller');

router.get('/', sessionsController.getSessions)
router.post('/', sessionsController.createSession)
router.put('/:id', sessionsController.updateSession)
router.delete('/:id',sessionsController.removeSession)

module.exports = router;
