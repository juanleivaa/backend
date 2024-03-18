var express = require('express');
var app = express();




//CREA UNA RUTA
app.get('/', function(req, res) {
    res.send('Hello World from EXPRESS actualized');
});


//IMPORTA LAS RUTAS DE USUARIO
var user_routes = require('./routes/user');
var transaction_routes = require('./routes/transaction');

//PARA QUE SE PUEDAN ENVIAR DATOS POR POSTMAN 
app.use(express.urlencoded(extended = true));


//ASIGNA UN PREFIJO A LAS RUTAS DE USUARIO
app.use('/api', [user_routes, transaction_routes]);



module.exports = app;