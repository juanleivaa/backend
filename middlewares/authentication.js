var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


const ensureAuth = (req, res, next) => {
    // Verificar si existe un token en la cabecera de autorización
    if (!req.headers.authorization) {
        return res.status(403).send({
            ok: false,
            message: 'No tienes autorización'
        });
    }

    // Obtener el token de la cabecera y eliminar comillas si las hay
    const token = req.headers.authorization.replace(/['"]+/g, '');

    // Verificar el token
    jwt.verify(token, SEED, (error, decoded) => {
        if (error) {
            return res.status(401).send({
                ok: false,
                message: 'Token no válido',
                error
            });
        }

        // Si el usuario tiene el rol adecuado, continuar con la solicitud
        req.user = decoded;
        next();
    });
};


module.exports = ensureAuth;