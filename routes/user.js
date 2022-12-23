const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const { postNewUser, getUser } = controller.user;

//********GET********/
router.get('/:auth_id', getUser);

//********POST********/
router.post('/create', postNewUser); //data in request body

module.exports = router;
