var express = require('express')

var router = express.Router()
var exercises = require('./api/exercises.route')
var sessions = require('./api/sessions.route')


router.use('/exercises', exercises);
router.use('/sessions', sessions);


module.exports = router;