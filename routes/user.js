var express = require('express');

var userController = require('../controllers/user');
var ensureAuth = require('../middlewares/authentication');

var api = express.Router()

//                          SI SE SUPERA EL MIDDLEWARE, SE EJECUTA EL CONTROLADOR           
api.post('/user',           ensureAuth ,                                            userController.addUser);
api.get('/user/:id',        ensureAuth ,                                            userController.getUser)
api.delete('/user/:id',     ensureAuth ,                                            userController.delUser)
api.put('/user/:id',        ensureAuth ,                                            userController.updUser)
api.get('/users',           ensureAuth ,                                            userController.getUsers)

//lo haremos con la query de postman, por eso no aclaro el id de la persona a la que le queremos cargar la imagen



api.post('/login' , userController.login)





module.exports = api;