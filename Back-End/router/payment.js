const route = require('express').Router();
const paymentController = require('../controllers/paymentController');

route.post('/',paymentController.processPayment)



module.exports = route;