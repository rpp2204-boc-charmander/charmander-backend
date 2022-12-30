const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const { postNewUser, checkUser, checkEmail, getUser } = controller.user;

//********GET********/
router.get('/:auth_id', checkUser);

//********GET********/
router.get('/:user_id', getUser);

//********GET********/
router.get('/:email', checkEmail);

//********POST********/
router.post('/create', postNewUser); //data in request body

module.exports = router;
