var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


const ensureAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).send({
            ok: false,
            message: 'No tienes autorización'
        });
    }

    //por si el token es copiado y pegado con comillas
    const token = req.headers.authorization.replace(/['"]+/g, '');

    jwt.verify(token, SEED , (error, decoded) => {
        if (error) {
            return res.status(401).send({
                ok: false,
                message: 'Token no válido',
                error
            });
        }
        req.user = decoded;
        next();
    })



}

module.exports = ensureAuth;