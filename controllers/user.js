var User = require('../models/user');

async function addUser(req, res) {
    let reqUser = req.body;
    if (!reqUser.password || !reqUser.email) {
        return res.status(400).send({ 
            ok: false,
            msg: 'Faltan datos obligatorios'
        });
    }

    console.log(reqUser)

    let user = new User(reqUser);

    try {
        const newUser = await user.save();
        return res.status(200).send({ 
            ok: true,
            msg: 'Usuario creado correctamente',
            user: newUser
        });
    } catch (error) {
        return res.status(500).send({ 
            ok: false,
            msg: 'Error al crear el usuario',
            error: error
        });
    }
}

async function getUsers(req,res) {
    let users = await User.find({})

    let total = users.length;
    let per_page = 2;
    const total_pages = Math.ceil(total / per_page);

    res.status(200).send({

        ok:true,
        msg: 'Lista de usuarios',
        users,
        total,
        per_page,
        total_pages
    });
}

async function getUser(req, res) {
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


module.exports = {
    addUser,
    getUsers,
    getUser,
    delUser,
    updUser
};