const user = require('../models/user');
var User = require('../models/user');
var bcrypt = require('bcrypt');
// var SEED = require('../config/config').SEED;
var salt = 10;
var jwtHelper = require('../helpers/jwt');

async function addUser(req, res) {
    // chequeamos si los datos que son requeridos vienen en la request
    if (!req.body.password || !req.body.email || !req.body.name) {
        return res.status(400).send({
            ok: false,
            msg: 'Faltan datos obligatorios'
        });
    }

    try {
        // Verificar si el email ya está en uso
        const existingUser = await User.findOne({ email: req.body.email }).exec();
        if (existingUser) {
            return res.status(400).send({
                ok: false,
                msg: 'El email ya está en uso'
            });
        }

        // Crear el nuevo usuario
        let user = new User(req.body);

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        // Guardar el usuario en la base de datos
        user = await user.save();

        return res.status(200).send({
            ok: true,
            message: 'Usuario guardado',
            user: user
        });
    } catch (err) {
        return res.status(500).send({
            ok: false,
            message: 'Error en la petición',
            error: err
        });
    }
}

async function getUsers(req, res) {
    // Verificar el rol del usuario
    if (req.user.role !== 'CLIENT_ROLE') {
        return res.status(403).send({
            ok: false,
            message: 'No tienes permiso para ver la lista de usuarios'
        });
    }

    // Si el usuario tiene el rol adecuado, obtener la lista de usuarios
    let users = await User.find({});

    let total = users.length;
    let per_page = 2;
    const total_pages = Math.ceil(total / per_page);

    res.status(200).send({
        ok: true,
        msg: 'Lista de usuarios',
        users,
        total,
        per_page,
        total_pages
    });
}


async function getUser(req, res) {


    //si no envian id de usuario a buscar, devuelvo error pues no voy a saber de quien es que hay que bsucar datos
    if(!req.params.id) 
        return res.status(400).send({
             ok: false, 
             message: 'Falta el id del usuario' 
        });


    //si el usuario es un cliente y el id que quiere consultar no es el suyo, devuelvo error
    if(req.user.role === 'CLIENT_ROLE' && req.user._id !== req.params.id){

        return res.status(400).send({
            ok: false,
            message: 'No tienes permiso para ver este usuario, pues no es tuyo'
        });

    }



    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).send({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }
        return res.status(200).send({
            ok: true,
            message: 'Usuario encontrado',
            user
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error en la petición',
            error
        });
    }
}

async function delUser(req, res) {
    const id = req.params.id;
    try {
        const userDeleted = await User.findByIdAndDelete(id);
        if (!userDeleted) {
            return res.status(400).send({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }
        return res.status(200).send({
            ok: true,
            message: 'Usuario eliminado',
            userDeleted
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error en la petición',
            error
        });
    }
}

async function updUser(req, res) {
    const id = req.params.id;
    let updateData = req.body;
    try {
        const userUpdated = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!userUpdated) {
            return res.status(400).send({
                ok: false,
                message: 'Usuario no encontrado',
            });
        }
        return res.status(200).send({
            ok: true,
            message: 'Usuario actualizado',
            userUpdated
        });
    } catch (err) {
        return res.status(500).send({
            ok: false,
            message: 'Error en la petición',
            error: err
        });
    }
}

async function login(req, res) {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(400).send({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            user.password = undefined;


            // Generar el token JWT con la información del usuario
            const token = await jwtHelper.generateJWT(user);

            // Enviar el token al cliente
            return res.status(200).send({
                ok: true,
                message: 'Login correcto',
                token,
                user
            });
        }

        return res.status(400).send({
            ok: false,
            message: 'Contraseña incorrecta'
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error en la petición',
            error
        });
    }
}


// const login = async (req, res) => {

//     const { passwordText, emailToFind } = req.body;

//     try {
//         const user = await User.findOne({ email: emailToFind }).exec();

//         if(!user) return res.status(400).send({ ok: false, message: 'Usuario no encontrado' });

//         const passwordDBhashed = user.password;

//         const result = await bcrypt.compare(passwordText, passwordDBhashed);

//         if(result){
//             user.password  = undefined
//             req.user = user;
//             const token = await jwtHelper.generateJWT(user);
//             return res.status(200).send({ ok: true, message: 'Login correcto', token, user });
//         } else {
//             return res.status(400).send({ ok: false, message: 'Datos ingresados incorrectos' });
        
//         }
//     }

//     catch (error) {
//         return res.status(500).send({ ok: false, message: 'Error en la petición', error });
//     }
// }       







module.exports = {
    addUser,
    getUsers,
    getUser,
    delUser,
    updUser,
    login
};