const { query } = require('../db/index');

module.exports = {
  postFutureDatesInDB: async () => {
    const queryString = `
    INSERT INTO public.dates(log_date)
    SELECT date
    FROM GENERATE_SERIES(CURRENT_DATE, CURRENT_DATE + interval '84 days', '1 day'::interval) date
    WHERE NOT EXISTS (SELECT log_date FROM dates WHERE log_date=date)`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getAllDates: async () => {
    const queryString = `SELECT id, log_date FROM public.dates ORDER BY log_date ASC`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },
};
