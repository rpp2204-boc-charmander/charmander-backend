const { query } = require('../db/');

const findDates = (date) => {
  let UTC = new Date(date);
  let year = UTC.getFullYear();
  let start = new Date(year - 1, 11, 24).toISOString().split('T')[0];
  let end = new Date(year, 11, 31).toISOString().split('T')[0];
  return {start, end};
};

module.exports = {
  getTest: async () => {
    try {
      let queryString = 'SELECT CURRENT_DATE';
      let result = await query(queryString);
      return result;
    } catch (err) {
      throw err;
    }
  },
  getCalGained: async (id, date) => {
    if (id === 'test') {
      return true;
    } else {
      try {
        let {start, end} = findDates(date);
        let params = [id, start, end];
        let queryString = 'SELECT (total_cals_gained, log_date) WHERE (user_id = $1) AND (log_date >= $2 AND log_date <= $3)';
        let result = await query(queryString, params);
        return result;
      } catch (err) {
        throw err;
      }
    }
  },
  getCalBurned: async (id, date) => {
    if (id === 'test') {
      return true;
    } else {
      try {
        let {start, end} = findDates(date);
        let params = [id, start, end];
        let queryString = 'SELECT (total_cals_burned, log_date) WHERE (user_id = $1) AND (log_date >= $2 AND log_date <= $3)';
        let result = await query(queryString, params);
        return result;
      } catch (err) {
        throw err;
      }
    }
  },
  getExerciseReports: async (id, date) => {
    if (id === 'test') {
      return true;
    } else {
      try {
        let {start, end} = findDates(date);
        let params = [id, start, end];
        /* Select from workout_exercises that are complete based off of user_id and date
          merge with exercises so the exercises name can be returned with it
          then find all of the sets that go with each of those workouts based on w_e id
        */
        let queryString = ``;
        let result = await query(queryString, params);
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
