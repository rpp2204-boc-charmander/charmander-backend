const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const { getAllDates } = controller.user;

//add more sub routes here. See app.js for main route
router.get('/dates', getAllDates);

module.exports = router;
