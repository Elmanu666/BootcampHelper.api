var express = require('express')

var router = express.Router()

var sessionsController = require('../../controllers/sessions.controller');

router.get('/:id', sessionsController.getSession)

module.exports = router;
