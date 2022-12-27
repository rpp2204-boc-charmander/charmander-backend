//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const {
  getUserFoodsFromDB,
  addUserFoodsToDB,
  updateUserFoodsInDB,
  removeUserFoodsInDB
} = require('../model/nutrition');

module.exports = {
  getUserFoods: (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
  addUserFoods: (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
  updateUserFoods: (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
  removeUserFoods: (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
};
