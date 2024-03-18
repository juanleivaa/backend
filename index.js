

const mongoose = require('mongoose');

//CONECTA A LA BASE DE DATOS
const password = require('./config/config').MONGOPASS;
const URL = `mongodb+srv://rollingcode12i:${password}@fisrt.1zojry9.mongodb.net/?retryWrites=true&w=majority&appName=fisrt`;


//IMPORTA EL SERVIDOR DE EXPRESS
const app = require('./app');
var PORT= 3200


async function connect() {
    await mongoose.connect(URL);
    console.log('DB connected');


    //SERVIDOR DE EXPRESS PARA RECIBIR PETICIONES
    app.listen(PORT , function() {
        console.log('Listening on port: ', PORT);
    })

}

connect().catch(err => console.error('Error connecting to MongoDB:', err));
