const {response, request} = require("express");
const Ante_Personales = require('../models/Modulo_Consultas/ante_personales');

const getAntecedentes = async (req = request, res = response) => {
    const antece = await Ante_Personales.findAll(
        {
            where: {
                state: true
            },
        });
    if (antece) {
        res.json({antece})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }

}

const postAntecedente = async (req = request, res = response) => {
    const {medicos, quirurjicos, traumaticos, alergicos, familiares, inmunizaciones} = req.body;
    try {
        const result = await Ante_Personales.create({medicos, quirurjicos, traumaticos, 
            alergicos, familiares, inmunizaciones});
        res.json({
            msg: 'Seccion de Antecedentes ingresada correctamente',
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putAntecedente = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const antece = await Ante_Personales.findByPk( id );
        await antece.update(body, {where:{id: id}});
        res.json( antece );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteAntecedente = async(req, res = response) =>{
    const { id } = req.params;
    try {
        const antece = await Ante_Personales.findByPk( id );
        await antece.update({state: false });
        res.status(200).json({
            msg: 'Seccion eliminada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

module.exports = {
    getAntecedentes,
    postAntecedente, 
    putAntecedente,
    deleteAntecedente
}