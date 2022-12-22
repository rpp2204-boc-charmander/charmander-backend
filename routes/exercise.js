const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const {
  getDefaultExercises,
  postUserCustomExercise,
  getUserExercises,
  postUserWorkoutExercise,
  getUserWorkoutForDate,
  postExerciseSet,
  getExerciseSet,
  deleteCustomExercise,
  deleteUserWorkoutExercise,
} = controller.exercise;

//********GET********/
//searching for exercises
router.get('/default/list', getDefaultExercises);

//searching for custom exercises
router.get('/custom/list', getUserExercises); //query params: user_id

//get exercises in a workout
router.get('/workout/list', getUserWorkoutForDate); //query params: user_id, log_date

//********POST********/
//making a new custom exercise
router.post('/custom/create', postUserCustomExercise); //query params: user_id, custom_exercise, muscle_group_id

//adding an exercise to a workout
router.post('/create', postUserWorkoutExercise); //query params: user_id, exercise_id, log_date

//********DELETE********/
//delete a custom exercise
router.delete('/custom/delete', deleteCustomExercise); //query params: user_id, exercise_id

//delete an exercise from a workout
router.delete('/workout/delete', deleteUserWorkoutExercise); //query params: user_id, exercise_id, log_date

module.exports = router;
