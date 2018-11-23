var express = require('express')

var router = express.Router()

var materialController = require('../../controllers/material.controller');

router.get('/', materialController.getMaterials)
router.get('/:id', materialController.getMaterial)
router.post('/', materialController.createMaterial)
router.put('/:id', materialController.updateMaterial)
router.delete('/:id',materialController.removeMaterial)

module.exports = router;
