const {response, request} = require("express");
const Det_cita = require('../models/Modulo_Consultas/det_cita');

const Usuarios = require('../models/user');
const ANPP = require('../models/Modulo_Consultas/anpp');
const Fin_Consulta = require('../models/Modulo_Consultas/fin_consulta');
const MHR = require('../models/Modulo_Consultas/MHR');
const Ante_Personales = require('../models/Modulo_Consultas/ante_personales');
const Examen_Fisico = require('../models/Modulo_Consultas/examen_fisico');
const Paciente = require('../models/paciente');
const { Op } = require("sequelize"); 

const getConsultasAnterioresPorPaciente = async (req = request, res = response) => {
    const { pacienteId } = req.params; // Obtener el ID del paciente de los parámetros de la URL

    try {
        // 1. Verificar si el paciente existe (buena práctica)
        const paciente = await Paciente.findByPk(pacienteId);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado.' });
        }

        // 2. Buscar las consultas anteriores para este paciente
        const consultasAnteriores = await Det_cita.findAll({
            where: {
                pacientes_id: pacienteId, // Filtrar por el ID del paciente
                state: true, // Asegúrate de que la consulta esté activa
                fecha_consulta: {
                    [Op.lt]: new Date() // Filtrar por fechas menores (anteriores) a la fecha y hora actual
                }
            },
            // Incluir el modelo Paciente para obtener el nombre completo, etc.
            // Esto es útil para mostrar el nombre del paciente en el frontend.
            include: [
                {
                    model: Paciente,
                    attributes: ['id', 'nombre', 'apellido'] // Solo trae el id, nombre y apellido del paciente
                }
            ],
            order: [
                ['fecha_consulta', 'DESC'] // Opcional: ordenar de la más reciente a la más antigua
            ]
        });

        // 3. Devolver las consultas encontradas
        res.status(200).json(consultasAnteriores);

    } catch (error) {
        console.error('Error al obtener consultas anteriores del paciente:', error);
        res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

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
    deleteDetalle,
    getConsultasAnterioresPorPaciente
}
