const {response, request} = require("express");
const Roles = require('../models/roles');
const User = require("../models/user");

const getUsuarios = async (req = request, res = response) => {
    const usuarios = await User.findAll(
        {
            where: {
                state: true
            },
            include:Roles
        });
    if (usuarios) {
        res.json({usuarios})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }

}


const getOnlyUser = async(req = request, res = response) => {
    const { id } = req.params;
    const usuario = await User.findOne(
        {
            where: {
                id: id
            },
            //include: Rol
        });
    if ( usuario ) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id: ${ id }`
        });
    }
}

const postUsuario = async (req = request, res = response) => {
    const {user, nombre_p, password, rolesid, telefono, correo, horario} = req.body;
    try {
        const result = await User.create({user, nombre_p, password, rolesid, telefono, correo, horario});
        res.json({
            msg: 'usuario creado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putUsuario = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await User.findByPk( id );
        await usuario.update(body, {where:{id: id}});
        res.json( usuario );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteUsuario = async(req, res = response) =>{
    const { id } = req.params;
    try {
        const usuario = await User.findByPk( id );
        await usuario.update({state: false });
        res.status(200).json({
            msg: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

module.exports = {
    getUsuarios,
    getOnlyUser,
    postUsuario,
    putUsuario,
    deleteUsuario
}