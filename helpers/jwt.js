const jwt = require('jsonwebtoken');
const SEED = 'Ca3Ca3';




const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { 
                name: user.name,
                surname: user.surname,
                role: user.role
            }, // payload
            SEED, // semilla o private key
            { expiresIn: 360, algorithm: 'HS512' }, // options
            (error, token) => {
                if (error) {
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};







// const generateJWT = (user = null) => {

//     return new Promise((resolve, reject) => {


//         jwt.sign(
//             { name: 'Pedro', surname: 'Perez', role: 'ADMIN_ROLE' }, // payload
//             SEED, // semilla o private key
//             { expiresIn: 360, algorithm: 'HS512' }, // options
//             (error, token) => {
//                 if (error) {
//                     reject('No se pudo generar el token');
//                 } 

//                 resolve (token);
//             }
//         );




//     });

// };

module.exports = { generateJWT };
