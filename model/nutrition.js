const db = require('../db');

module.exports = {
  addUserFoodsToDB: async() => {
    // add foods insert will go here

    const queryString = `INSERT INTO public.nutrition_log(
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
  getUserFoodsFromDB: async() => {
    // get foods for the day query will go here
  },
  updateUserFoodsInDB: async() => {
    // update foods put will go here
  },
  removeUserFoodsInDB: async() => {
    // delete foods will go here
  }
};
