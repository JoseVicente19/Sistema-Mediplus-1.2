const {response, request} = require("express");
const Det_cita = require('../models/Modulo_Consultas/det_cita');

const Usuarios = require('../models/user');
const ANPP = require('../models/Modulo_Consultas/anpp');
const Fin_Consulta = require('../models/Modulo_Consultas/fin_consulta');
const MHR = require('../models/Modulo_Consultas/MHR');
const Ante_Personales = require('../models/Modulo_Consultas/ante_personales');
const Examen_Fisico = require('../models/Modulo_Consultas/examen_fisico');
const Paciente = require('../models/paciente');

const getDetalle = async (req = request, res = response) => {
    const detalle = await Det_cita.findAll(
        {
            where: {
                state: true
            },
            include: [
                Usuarios,
                ANPP,
                Fin_Consulta,
                MHR,
                Ante_Personales,
                Examen_Fisico,
                Paciente
            ]
        });
    if (detalle) {
        res.json({detalle})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }
}

const postDetalle = async (req = request, res = response) => {
    const { tipo, usersid, anpp_id, fin_consulta_id, mc_hea_rsx_id, 
        ante_personales_id, examen_fisico_id, pacientes_id } = req.body;
    try {
        const result = await Det_cita.create({ tipo, usersid, anpp_id, fin_consulta_id, mc_hea_rsx_id, 
            ante_personales_id, examen_fisico_id, pacientes_id });
        res.json({
            msg: 'Seccion agregada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putDetalle = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const detalle = await Det_cita.findByPk( id );
        await detalle.update(body, {where:{id: id}});
        res.json( detalle );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteDetalle = async(req, res = response) =>{
    const { id } = req.params;
    try {
        const det = await Det_cita.findByPk( id );
        await det.update({state: false });
        res.status(200).json({
            msg: 'Detalle eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

module.exports = {
    getDetalle,
    postDetalle, 
    putDetalle,
    deleteDetalle
}
