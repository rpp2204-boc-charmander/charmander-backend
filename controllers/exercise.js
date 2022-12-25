//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const { user } = require('.');
const {
  getDefaultExercisesFromDB,
  getMuscleGroupsFromDB,
  insertUserCustomExerciseInDB,
  getUserExercisesFromDB,
  insertUserWorkoutExerciseInDB,
  getUserWorkoutFromDB,
  insertUserExerciseSetInDB,
  getUserExerciseSetFromDB,
  deleteExerciseSetFromDB,
  deleteWorkoutExerciseFromDB,
  deleteCustomExerciseFromDB,
  setActualRepsForSet,
} = require('../model/exercise');

module.exports = {
  getDefaultExercises: async (req, res, next) => {
    try {
      //doing promise all to batch these async functions so they run in parallel instead of one after the other. This is for performance optimization

      const [exercises, muscle_groups] = await Promise.all([
        getDefaultExercisesFromDB(),
        getMuscleGroupsFromDB(),
      ]);

      const result = { exercises, muscle_groups };

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },

  getUserExercises: async (req, res, next) => {
    try {
      const { user_id } = req.query;

      const result = await getUserExercisesFromDB(user_id);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },

  postUserCustomExercise: async (req, res, next) => {
    try {
      const { user_id, custom_exercise, muscle_group_id } = req.query;

      await insertUserCustomExerciseInDB(
        user_id,
        custom_exercise,
        muscle_group_id
      );

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },

  postUserWorkoutExercise: async (req, res, next) => {
    try {
      const { user_id, log_date, exercise_id } = req.query;

      await insertUserWorkoutExerciseInDB(log_date, exercise_id, user_id);

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },

  getUserWorkoutForDate: async (req, res, next) => {
    try {
      const { user_id, log_date } = req.query;

      const result = await getUserWorkoutFromDB(user_id, log_date);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },

  postExerciseSet: async (req, res, next) => {
    try {
      const { weight_lbs, reps, workout_exercise_id } = req.query;

      await insertUserExerciseSetInDB(weight_lbs, reps, workout_exercise_id);

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },

  getExerciseSet: async (req, res, next) => {
    try {
      const { workout_exercise_id } = req.query;

      const result = await getUserExerciseSetFromDB(workout_exercise_id);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },

  deleteExerciseSet: async (req, res, next) => {
    try {
      const { set_id } = req.query;

      const result = await deleteExerciseSetFromDB(set_id);

      res.status(200).send(`Successfully Deleted Set ${set_id}`)
    } catch (err) {
      next(err);
    }
  },

  deleteCustomExercise: async (req, res, next) => {
    try {
      const { user_id, exercise_id } = req.query;

      await deleteCustomExerciseFromDB(user_id, exercise_id);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },

  deleteWorkoutExercise: async (req, res, next) => {
    try {
      const { id } = req.query;

      const result = await deleteWorkoutExerciseFromDB(id);

      res.status(200).send(`Successfully Deleted Workout Exercise ${id}`)
    } catch (err) {
      next(err);
    }
  },

  completeExerciseSet: async (req, res, next) => {
    try {
      const { set_id, actual_reps } = req.query;

      const result = await setActualRepsForSet(set_id, actual_reps);

      res.status(200).send(`Successfully Updated Set ${set_id} with actual reps of ${actual_reps}`)
    } catch (err) {
      next(err);
    }
  }
};
