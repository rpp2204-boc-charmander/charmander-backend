const { query } = require('../db/index');

module.exports = {
  postFutureDatesInDB: async (next) => {
    const queryString = `
    INSERT INTO public.dates(log_date)
    SELECT date
    FROM GENERATE_SERIES(CURRENT_DATE, CURRENT_DATE + INTERVAL '84 days', '1 day'::interval) date
    EXCEPT
    SELECT log_date from dates`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      //note: next is being passed from the controller for the purpose of error handling using the error handler middleware that we defined in middleware/error.js
      next(err);
    }
  },

  getAllDates: async (next) => {
    const queryString = `SELECT id, log_date FROM public.dates ORDER BY log_date ASC`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      //note: next is being passed from the controller for the purpose of error handling using the error handler middleware that we defined in middleware/error.js
      next(err);
    }
  },
};
