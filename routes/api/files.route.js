var express = require('express')

var router = express.Router()

// Getting the exercise Controller that we just created

var fileController = require('../../controllers/file.controller');


// Map each API to the Controller FUnctions

router.get('/', fileController.getFiles)

router.post('/', fileController.createFile)

router.put('/:id', fileController.updateFile)

router.delete('/:id',fileController.removeFile)


// Export the Router

module.exports = router;