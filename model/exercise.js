const { query } = require('../db');

module.exports = {
  //////////////////////////
  //searching for exercises
  //////////////////////////
  getDefaultExercisesFromDB: async () => {
    const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    WHERE user_id IS NULL`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getMuscleGroupsFromDB: async () => {
    const queryString = `SELECT muscle_groups.id AS muscle_group_id, muscle_group FROM muscle_groups`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  //////////////////////////
  //creating custom exercises
  //////////////////////////

  insertUserCustomExerciseInDB: async (
    user_id,
    custom_exercise,
    muscle_group_id
  ) => {
    const queryString = `INSERT INTO exercises(
      exercise, muscle_group_id, user_id)
      VALUES ($1,$2, $3)`;

    const params = [custom_exercise, muscle_group_id, user_id];

    try {
      const result = await query(queryString, params);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getUserExercisesFromDB: async (user_id) => {
    const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    WHERE user_id=$1`;

    const params = [user_id];

    try {
      const result = await query(queryString, params);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  insertUserWorkoutExerciseInDB: async (log_date, exercise_id, user_id) => {
    const queryString = `INSERT INTO public.workout_exercises(
      log_date, exercise_id, user_id)
      VALUES ($1, $2, $3)`;

    const params = [log_date, exercise_id, user_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getUserWorkoutFromDB: async (user_id, log_date) => {
    const queryString = `SELECT workout_exercises.id AS exercise_id, exercises.exercise, est_cals_burned
    FROM public.workout_exercises
    JOIN users on workout_exercises.user_id=users.id
    JOIN exercises on workout_exercises.exercise_id=exercises.id
    WHERE users.id=$1 AND log_date=$2`;

    const params = [user_id, log_date];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  insertUserExerciseSetInDB: async (weight_lbs, reps, workout_exercise_id) => {
    const queryString = `INSERT INTO public.exercise_set(
      weight_lbs, reps, workout_exercise_id)
      VALUES ($1, $2, $3)`;

    const params = [weight_lbs, reps, workout_exercise_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getUserExerciseSetFromDB: async (workout_exercise_id) => {
    const queryString = `SELECT id AS set_id, weight_lbs, reps, reps_actual, workout_exercise_id
    FROM public.exercise_set
    WHERE workout_exercise_id=$1`;

    const params = [workout_exercise_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteCustomExerciseFromDB: async (user_id, exercise_id) => {
    const queryString = `DELETE FROM public.exercises
    WHERE user_id=$1
    AND exercises.id=$2`;

    const params = [user_id, exercise_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteUserWorkoutExerciseFromDB: async (exercise_id, user_id, log_date) => {
    const queryString = `DELETE FROM public.workout_exercises
    WHERE exercise_id=$1
    AND user_id=$2
    AND log_date=$3`;

    const params = [exercise_id, user_id, log_date];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },
};
