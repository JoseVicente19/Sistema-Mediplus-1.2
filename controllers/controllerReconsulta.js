const { response, request } = require("express");
const MHR = require('../models/Modulo_Consultas/MHR');
const Examen_Fisico = require('../models/Modulo_Consultas/examen_fisico');
const Paciente = require('../models/paciente');
const reconsulta = require('../models/Modulo_Consultas/reconsulta');

// Nueva función para obtener todas las reconsultas
const getAllReconsultas = async (req = request, res = response) => {
    try {
        const reconsultas = await reconsulta.findAll({
            where: {
                state: true
            },
            include: [
                { model: MHR },
                { model: Examen_Fisico },
                { model: Paciente }
            ]
        });
        res.json({ reconsultas });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener todas las reconsultas'
        });
    }
};

const getReconsultas = async (req = request, res = response) => {
    const { pacienteId } = req.params;
    const reconsultas = await reconsulta.findAll({
        where: {
            pacientes_id: pacienteId,
            state: true
        },
        include: [
            { model: MHR },
            { model: Examen_Fisico }
        ]
    });

    if (reconsultas) {
        res.json({ reconsultas });
    } else {
        res.status(404).json({
            msg: 'No se encontraron reconsultas para este paciente'
        });
    }
}

const postReconsulta = async (req = request, res = response) => {
    const { comentario, mc_hea_rsx_id, examen_fisico_id, pacientes_id } = req.body;
    try {
        const result = await reconsulta.create({ comentario, mc_hea_rsx_id, examen_fisico_id, pacientes_id });
        res.json({
            msg: 'Reconsulta creada correctamente',
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuníquese con el administrador'
        });
    }
}

const putReconsulta = async (req = request, res = response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const reconsultaEncontrada = await reconsulta.findByPk(id);
        if (!reconsultaEncontrada) {
            return res.status(404).json({ msg: 'Reconsulta no encontrada' });
        }
        await reconsultaEncontrada.update(body);
        res.json(reconsultaEncontrada);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuníquese con el administrador'
        });
    }
}

const deleteReconsulta = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const reconsultaEncontrada = await reconsulta.findByPk(id);
        if (!reconsultaEncontrada) {
            return res.status(404).json({ msg: 'Reconsulta no encontrada' });
        }
        await reconsultaEncontrada.update({ state: false });
        res.status(200).json({
            msg: 'Reconsulta removida correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuníquese con el administrador'
        });
    }
}

const getReconsultaById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const reconsultaEncontrada = await reconsulta.findByPk(id, {
            include: [
                { model: MHR },
                { model: Examen_Fisico },
                { model: Paciente }
            ]
        });

        if (!reconsultaEncontrada) {
            return res.status(404).json({ msg: 'Reconsulta no encontrada' });
        }

        res.json(reconsultaEncontrada);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la reconsulta'
        });
    }
};

module.exports = {
    getAllReconsultas,
    getReconsultas,
    postReconsulta,
    putReconsulta,
    deleteReconsulta,
    getReconsultaById
};