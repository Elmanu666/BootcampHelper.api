var express = require('express')

var router = express.Router()
var exercises = require('./api/exercises.route')
var sessions = require('./api/sessions.route')
var files = require('./api/files.route')
var user = require('./api/user.route')


router.use('/exercises', exercises);
router.use('/sessions', sessions);
router.use('/files', files);
router.use('/user', user);


module.exports = router;