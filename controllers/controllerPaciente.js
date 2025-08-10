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

// Obtener un paciente por su ID
const getPacienteById = async (req = request, res = response) => {
    // Extraer el ID de los parámetros de la solicitud
    const { id } = req.params;
    
    try {
        // Buscar un paciente por su clave primaria (ID) y verificar que el estado sea verdadero
        const paciente = await Paciente.findOne({
            where: {
                id: id,
                state: true
            },
            // Incluir el modelo de Usuario para traer los datos del usuario asociado
            include: Usuarios
        });

        // Si se encuentra el paciente, responder con sus datos
        if (paciente) {
            res.json({ paciente });
        } else {
            // Si el paciente no se encuentra, enviar un código de estado 404
            res.status(404).json({
                msg: `No se encontró un paciente con el id ${id} o no está activo.`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuníquese con el administrador'
        });
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
    getPacienteById,
    postPaciente,
    putPaciente,
    deletePaciente
}