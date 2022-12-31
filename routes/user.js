const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const { postNewUser, getUser, getEmail } = controller.user;

//********GET********/
router.get('/:auth_id', getUser);

//********GET EMAIL */
router.get('/email/:email', getEmail);

//********POST********/
router.post('/create', postNewUser); //data in request body



module.exports = router;
