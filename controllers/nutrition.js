//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const {
  addFoodsToDB,
  addUserFoods,
  getUserFoodsFromDB,
  updateUserFoods,
  removeUserFoods,
  foodSearchInDB
} = require('../model/nutrition');

module.exports = {
  foodSearch: async (req, res, next) => {
    const { food_id } = req.query;
    try {
      const id = await foodSearchInDB(food_id);
      if(id.length === 0){
        const foodId = await module.exports.addFoodToDB(req, res, next);
        res.send(foodId);
      } else {
        res.status(200).send(id[0]);
      }
    } catch (err) {
      next(err);
    }
  },
  getFoodLog: async (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
  logFood: async (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
  addFoodToDB: async (req, res, next) => {
    const { label, foodId, nutrients } = req.query.food;
    const stringedMeasurements = JSON.stringify(req.query.measures);
    const stringedNutrients = JSON.stringify(nutrients);
    const food_image = req.query.food.food_image || 'no image available';
    try {
      const newId = await addFoodsToDB(label, foodId, stringedMeasurements, stringedNutrients, food_image);
      console.log('newId: ', newId);
      res.send(newId);
    } catch (err) {
      next(err);
    }
  },
  updateLog: async (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
  deleteFromLog: async (req, res, next) => {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  },
};
