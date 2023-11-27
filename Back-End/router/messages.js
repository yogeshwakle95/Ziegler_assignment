const route = require('express').Router();
const messageController = require('../controllers/messageController');

route.post('/',messageController.createMessage);
route.get('/',messageController.getMessage);
route.get('/:userId',messageController.getMessageByUserId);

module.exports = route;