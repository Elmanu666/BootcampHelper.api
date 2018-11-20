var express = require('express')

var router = express.Router()
var exercises = require('./api/exercises.route')
var sessions = require('./api/sessions.route')
var session = require('./api/session.route')
var files = require('./api/files.route')
var user = require('./api/user.route')
var material = require('./api/material.route')


router.use('/exercises', exercises);
router.use('/sessions', sessions);
router.use('/session', session);
router.use('/files', files);
router.use('/user', user);
router.use('/materials', material);
router.use('/material', material);
router.use('/users', user);


module.exports = router;