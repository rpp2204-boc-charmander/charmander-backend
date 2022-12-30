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
    sex,
    profile_pic
  ) => {
    const queryString = `INSERT INTO public.users(
      auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const params = [
      auth_id,
      firstname,
      lastname,
      email,
      user_password,
      weight_lbs,
      height_inches,
      sex,
      profile_pic,
    ];
    try {
      const result = await query(queryString, params);
      console.log('params', params)

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  checkUserInDB: async (auth_id) => {
    const queryString = `SELECT id AS user_id, auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex, profile_pic
    FROM public.users
    WHERE auth_id=$1`;

    const params = [auth_id];

    try {
      const result = await query(queryString, params);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  checkEmailInDB: async (email) => {
    const queryString = `SELECT id AS user_id, auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex, profile_pic
    FROM public.users
    WHERE email=$1`;

    const params = [email];

    try {
      const result = await query(queryString, params);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  selectUserFromDB: async (user_id) => {
    const queryString = `SELECT id AS user_id, auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex, profile_pic
    FROM public.users
    WHERE user_id=$1`;

    const params = [user_id];

    try {
      const result = await query(queryString, params);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },


};
