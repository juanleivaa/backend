const jwt = require('jsonwebtoken');
const SEED = 'Ca3Ca3';




const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { 
                name: user.name,
                surname: user.surname,
                role: user.role,
                email: user.email,
                avatar: user.avatar,
                active: user.active,
                dir: user.dir,
                dir_num: user.dir_num,
                id: user._id



            }, // payload
            SEED, // semilla o private key
            { expiresIn: 3600, algorithm: 'HS512' }, // options
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
