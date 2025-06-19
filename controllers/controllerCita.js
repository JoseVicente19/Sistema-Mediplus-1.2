const {response, request} = require("express");
const Usuarios = require('../models/user');
const Paciente = require('../models/paciente');
const Cita = require('../models/cita');

const getCitas = async (req = request, res = response) => {
    const cita = await Cita.findAll(
        {
            where: {
                state: true
            },
            include:Usuarios
        });
    if (cita) {
        res.json({cita})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }
}

const postCita = async (req = request, res = response) => {
    const {nombre_paciente, medico_atendiendo, fecha, motivo, 
        estado, observaciones, usersid} = req.body;
    try {
        const result = await Cita.create({nombre_paciente, medico_atendiendo, 
            fecha, motivo, estado, observaciones, usersid});
        res.json({
            msg: 'Cita Creada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putCita = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const cita = await Cita.findByPk( id );
        await cita.update(body, {where:{id: id}});
        res.json( cita );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteCita= async(req, res = response) =>{
    const { id } = req.params;
    try {
        const cita = await Cita.findByPk( id );
        await cita.update({state: false });
        res.status(200).json({
            msg: 'Cita removida correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

module.exports = {
    getCitas,
    postCita,
    putCita,
    deleteCita
}