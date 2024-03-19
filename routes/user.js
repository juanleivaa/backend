var express = require('express');

var api = express.Router()
var userController = require('../controllers/user');
var ensureAuth = require('../middlewares/authentication');



//                      SI SE SUPERA EL MIDDLEWARE, SE EJECUTA EL CONTROLADOR           
api.post('/user',       ensureAuth ,                                            userController.addUser);
api.get('/user/:id',    ensureAuth ,                                            userController.getUser)
api.delete('/user/:id', ensureAuth ,                                            userController.delUser)
api.put('/user/:id',    ensureAuth ,                                            userController.updUser)
api.get('/users',       ensureAuth ,                                            userController.getUsers)




api.post('/login' , userController.login)





module.exports = api;