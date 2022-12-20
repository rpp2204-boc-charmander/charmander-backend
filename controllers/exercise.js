//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const {
  getDefaultExercisesFromDB,
  getMuscleGroupsFromDB,
  getUserExercisesFromDB,
  insertUserWorkoutExerciseInDB,
  getUserWorkoutFromDB,
  insertUserExerciseSetInDB,
  getUserExerciseSetFromDB,
  deleteExerciseSetFromDB,
  deleteWorkoutFromDB
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
      const { username } = req.query;

      const result = await getUserExercisesFromDB(username);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },

  postUserWorkoutExercise: async (req, res, next) => {
    try {
      const { username, log_date, exercise } = req.query;

      await insertUserWorkoutExerciseInDB(log_date, exercise, username);

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },

  getUserWorkoutForDate: async (req, res, next) => {
    try {
      const { username, log_date } = req.query;

      const result = await getUserWorkoutFromDB(username, log_date);

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

  deleteWorkout: async (req, res, next) => {
    try {
      const { workout_exercise_id } = req.query;

      const result = await deleteWorkoutFromDB(workout_exercise_id);

      res.status(200).send(`Successfully Deleted Workout ${workout_exercise_id}`)
    } catch (err) {
      next(err);
    }
  }
};
