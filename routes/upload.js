var express = require('express');


var userController = require('../controllers/user');
var ensureAuth = require('../middlewares/authentication');
var fileUpload = require('express-fileupload');



var api = express.Router()
api.use(fileUpload())

//lo haremos con la query de postman, por eso no aclaro el id de la persona a la que le queremos cargar la imagen
api.post('/upload-avatar',  ensureAuth , userController.uploadAvatar)


module.exports = api;