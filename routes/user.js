var express = require('express');

var api = express.Router()
var userController = require('../controllers/user');


api.post('/user', userController.addUser);
api.get('/user/:id', userController.getUser)
api.delete('/user/:id', userController.delUser)
api.put('/user/:id', userController.updUser)

api.get('/users', userController.getUsers)

module.exports = api;