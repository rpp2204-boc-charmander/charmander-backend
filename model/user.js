const { query } = require('../db/index');

module.exports = {
  insertNewUserInDB: async (
    auth_id,
    firstname,
    lastname,
    email,
    user_password,
    weight_lbs,
    height_inches,
    sex
  ) => {
    const queryString = `INSERT INTO public.users(
      auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const params = [
      auth_id,
      firstname,
      lastname,
      email,
      user_password,
      weight_lbs,
      height_inches,
      sex,
    ];
    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  selectUserFromDB: async () => {
    const queryString = `SELECT id AS user_id, auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex
    FROM public.users`;

    try {
      const result = await query(queryString);

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },
};
