const { query } = require('../db/index');

module.exports = {
  getDefaultExercisesFromDB: async (next) => {
    const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    WHERE user_id IS NULL`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      //note: next is being passed from the controller for the purpose of error handling using the error handler middleware that we defined in middleware/error.js
      next(err);
    }
  },

  getMuscleGroupsFromDB: async (next) => {
    const queryString = `SELECT muscle_groups.id AS muscle_group_id, muscle_group FROM muscle_groups`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      //note: next is being passed from the controller for the purpose of error handling using the error handler middleware that we defined in middleware/error.js
      next(err);
    }
  },

  getUserExercisesFromDB: async (user_id, next) => {
    const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    WHERE user_id=$1`;

    const params = [user_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      //note: next is being passed from the controller for the purpose of error handling using the error handler middleware that we defined in middleware/error.js
      next(err);
    }
  },
};
