const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const { test } = controller.report;

//add more sub routes here. See app.js for main route
router.get('/test', test);

module.exports = router;