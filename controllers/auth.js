const {response, request} = require("express");

const Usuario = require('../models/user');
const Rol = require('../models/roles');
const { generarJWT } = require("../Helpers/genrarJWT");
const jwt = require('jsonwebtoken');

const login = async(req = request, res = response) => {
    const { username, password } = req.body;
    try {
        let usuario = await Usuario.findOne({
            where:{
                user: username
            },
            include: Rol
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / contraseña  no son correctos',
            })
        }
        if (usuario.state === 0) {
            return res.status(400).json({
                msg: 'No existe un usuario con esas credenciales, comuniquese con el administrador',
            })
        }
        if (usuario.password !== password) {
            return res.status(400).json({
                msg: 'Usuario / contraseña  no son correctos',
            })
        }
        let roldeusuario = usuario.role.id
        let idUsuario = usuario.id
        const token = await generarJWT(roldeusuario, idUsuario);
        const { user } = usuario
        res.json({
            msg: 'login ok',
            user,
            jwt: token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error al iniciar sesion, comuniquese con el administrador'
        })
    }
}

const authenticated = async(req = request, res = response) => {
    const { token } = req.body;
    try {
        const payload = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const usuario = await Usuario.findByPk( payload.uid );
        if (!usuario.state) {
            return res.status(401).json({
                error: 'Usuario no existe',
                session: false,
            })
        }
        res.json({
            msg: 'authorize',
            session: true,
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error al iniciar sesion, comuniquese con el administrador',
        })
    }
}


module.exports = {
    login,
    authenticated
}