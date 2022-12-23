const db = require('../db');

module.exports = {
  getDefaultExercisesFromDB: async () => {
    const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    WHERE user_id IS NULL`;

    try {
      const result = await db.query(queryString);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getMuscleGroupsFromDB: async () => {
    const queryString = `SELECT muscle_groups.id AS muscle_group_id, muscle_group FROM muscle_groups`;

    try {
      const result = await db.query(queryString);

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
      const result = await db.query(queryString, params);

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
      const result = await db.query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getUserWorkoutFromDB: async (username, log_date) => {
    const queryString = `SELECT we.id,
                                we.est_cals_burned,
                                we.log_date,
                                e.exercise,
                                u.username,
                                mg.muscle_group,
                                COALESCE(JSON_AGG(JSON_BUILD_OBJECT(
                                  'set_id', es.id,
                                  'weight_lbs', es.weight_lbs,
                                  'reps', es.reps,
                                  'reps_actual', es.reps_actual,
                                  'workout_id', es.workout_exercise_id
                                )) FILTER (WHERE reps IS NOT null), '[]'::json ) AS sets
                          FROM workout_exercises AS we
                          LEFT JOIN exercise_set AS es ON we.id = es.workout_exercise_id
                          JOIN exercises AS e ON e.id = we.exercise_id
                          JOIN users AS u ON u.id = we.user_id
                          JOIN muscle_groups AS mg ON mg.id = e.muscle_group_id
                          WHERE username = $1 AND log_date=$2
                          GROUP BY we.id, e.exercise, u.username, mg.muscle_group`;

    const params = [username, log_date];

    try {

      const result = await db.query(queryString, params);

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
      const result = await db.query(queryString, params);

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
      const result = await db.query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteExerciseSetFromDB: async (set_id) => {
    const queryString = `DELETE FROM exercise_set WHERE id = $1`

    const params = [set_id];

    try {
      const result = await db.query(queryString, params);

      return;
    } catch (err) {
      throw err;
    }
  },

  deleteWorkoutFromDB: async (workout_exercise_id) => {
    const queryString1 = `DELETE FROM workout_exercises WHERE id = $1`;
    const queryString2 = `DELETE FROM exercise_set WHERE workout_exercise_id = $1`;

    const params = [workout_exercise_id];

    try {
      const deleteSets = await db.query(queryString2, params);
      const deleteWorkout = await db.query(queryString1, params);

      return;
    } catch (err) {
      throw err;
    }
  }
};
