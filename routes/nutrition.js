const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const {
  getUserFoods,
  addUserFoods,
  updateUserFoods,
  removeUserFoods
} = controller.nutrition;

//add more sub routes here. See app.js for main route
router.get('/list/foods', getUserFoods);

router.post('/create/foods', addUserFoods);

router.put('/update/foods', updateUserFoods);

router.delete('/remove/foods', removeUserFoods);

module.exports = router;
