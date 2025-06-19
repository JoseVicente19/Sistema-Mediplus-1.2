const {response, request} = require("express");
const Usuarios = require('../models/user');
const Paciente = require("../models/paciente");

const getPacientes = async (req = request, res = response) => {
    const pacientes = await Paciente.findAll(
        {
            where: {
                state: true
            },
            include:Usuarios
        });
    if (pacientes) {
        res.json({pacientes})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }
}

const postPaciente = async (req = request, res = response) => {
    const {nombre, apellido, fecha_nac, edad, sexo, origen, direccion, escolaridad, 
        ocupacion, estado_civil, religion, correo, telefono, usersid} = req.body;
    try {
        const result = await Paciente.create({nombre, apellido, fecha_nac, edad, sexo, origen, direccion, escolaridad, 
            ocupacion, estado_civil, religion, correo, telefono, usersid});
        res.json({
            msg: 'Paciente Agregado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putPaciente = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const paciente = await Paciente.findByPk( id );
        await paciente.update(body, {where:{id: id}});
        res.json( paciente );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deletePaciente = async(req, res = response) =>{
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk( id );
        await paciente.update({state: false });
        res.status(200).json({
            msg: 'Paciente eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

module.exports = {
    getPacientes,
    postPaciente,
    putPaciente,
    deletePaciente
}