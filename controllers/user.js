//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const { insertNewUserInDB, selectUserFromDB } = require('../model/user');

module.exports = {
  postNewUser: async (req, res, next) => {
    const {
      auth_id,
      firstname,
      lastname,
      email,
      user_password,
      weight_lbs,
      height_inches,
      sex,
    } = req.body;

    try {
      await insertNewUserInDB(
        auth_id,
        firstname,
        lastname,
        email,
        user_password,
        weight_lbs,
        height_inches,
        sex
      );

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },

  getUser: async (req, res, next) => {
    const { auth_id } = req.params;

    try {
      const result = await selectUserFromDB(auth_id);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
};
