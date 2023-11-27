const route = require('express').Router();
const userController = require('../controllers/userController');
const {createUserValidation} = require('../controllers/userController');

route.post("/",createUserValidation,userController.createUser);
route.post("/signin",userController.signInUser);

module.exports = route;