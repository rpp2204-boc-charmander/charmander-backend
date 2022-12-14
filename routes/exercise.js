const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const {
  getDefaultExercises,
  getUserExercises,
  postUserWorkoutExercise,
  getUserWorkoutForDate,
  postExerciseSet,
  getExerciseSet,
} = controller.exercise;

//add more sub routes here. See app.js for main route
router.get('/default/list', getDefaultExercises);
router.get('/custom/list', getUserExercises);

//take care of workout exercises
router.post('/create', postUserWorkoutExercise);
router.get('/list', getUserWorkoutForDate);

//take care of sets
router.post('/create/set', postExerciseSet);
router.get('/list/sets', getExerciseSet);

module.exports = router;
