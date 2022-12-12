const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const { getDefaultExercises, getUserExercises } = controller.exercise;

//add more sub routes here. See app.js for main route
router.get('/default/list', getDefaultExercises);
router.get('/:user_id/list', getUserExercises);

module.exports = router;
