var express = require('express');
var app = express();




//CREA UNA RUTA
app.get('/', function(req, res) {
    res.send('Hello World from EXPRESS actualized');
});


//IMPORTA LAS RUTAS DE USUARIO
var user_routes = require('./routes/user');

//PARA QUE SE PUEDAN ENVIAR DATOS POR POSTMAN 
app.use(express.urlencoded(extended = true));


//ASIGNA UN PREFIJO A LAS RUTAS DE USUARIO
app.use('/api', 
    user_routes
);



module.exports = app;