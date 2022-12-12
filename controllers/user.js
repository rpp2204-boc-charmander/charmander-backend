//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const { postFutureDatesInDB, getAllDates } = require('../model/user');

module.exports = {
  getAllDates: async (req, res, next) => {
    //generate only new dates and get and return all the dates
    try {
      await postFutureDatesInDB(next);
      const result = await getAllDates(next);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },

  getDates: async (req, res, next) => {
    try {
      const result = await postFutureDatesInDB(next);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },
};
