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
  deleteExerciseSet,
  deleteWorkout
} = controller.exercise;

//add more sub routes here. See app.js for main route
router.get('/default/list', getDefaultExercises);
router.get('/custom/list', getUserExercises); //query params: username

//take care of workout exercises
router.post('/create', postUserWorkoutExercise); //query params: username, log_date, exercise
router.get('/list', getUserWorkoutForDate); //query params: username, log_date
router.delete('/workout', deleteWorkout); //query params: workout_exercise_id

//take care of sets
router.post('/create/set', postExerciseSet); //query params: weight_lbs, reps, workout_exercise_id
router.get('/list/sets', getExerciseSet); //query params: workout_exercise_id
router.delete('/sets', deleteExerciseSet); //query params: set_id


module.exports = router;
