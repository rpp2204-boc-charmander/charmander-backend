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
router.get('/custom/list', getUserExercises); //query params: username

//take care of workout exercises
router.post('/create', postUserWorkoutExercise); //query params: username, log_date, exercise
router.get('/list', getUserWorkoutForDate); //query params: username, log_date

//take care of sets
router.post('/create/set', postExerciseSet); //query params: weight_lbs, reps, workout_exercise_id
router.get('/list/sets', getExerciseSet); //query params: workout_exercise_id


module.exports = router;
