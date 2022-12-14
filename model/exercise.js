const { query } = require('../db/index');

module.exports = {
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

  getUserExercisesFromDB: async (username) => {
    const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    WHERE user_id=(SELECT id FROM users WHERE username=$1)`;

    const params = [username];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  insertUserWorkoutExerciseInDB: async (log_date, exercise, username) => {
    const queryString = `INSERT INTO public.workout_exercises(
      log_date, exercise_id, user_id)
      VALUES ($1,
          (SELECT id FROM exercises WHERE exercise=$2),
          (SELECT id FROM users WHERE username=$3))`;

    const params = [log_date, exercise, username];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getUserWorkoutFromDB: async (username, log_date) => {
    const queryString = `SELECT we.id, u.username, e.exercise, log_date, est_cals_burned, mg.muscle_group
                         FROM public.workout_exercises AS we
                         JOIN users AS u
                         ON we.user_id = u.id
                         JOIN exercises AS e
                         ON we.exercise_id = e.id
                         JOIN muscle_groups AS mg
                         ON e.muscle_group_id = mg.id
                         WHERE username=$1 AND log_date=$2`;

    const params = [username, log_date];

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
};
