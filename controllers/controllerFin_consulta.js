const {response, request} = require("express");
const Fin_Consulta = require('../models/Modulo_Consultas/fin_consulta');

const getFinConsulta = async (req = request, res = response) => {
    const fconsul = await Fin_Consulta.findAll(
        {
            where: {
                state: true
            },
        });
    if (fconsul) {
        res.json({fconsul})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }

}

const postFinConsulta = async (req = request, res = response) => {
    const {diagnostico, trat_intrahospitalario, plan_de_accion} = req.body;
    try {
        const result = await Fin_Consulta.create({diagnostico, 
            trat_intrahospitalario, plan_de_accion});
        res.json({
            msg: 'Seccion agregada correctamente',
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putFinConsulta = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const fconsul = await Fin_Consulta.findByPk( id );
        await fconsul.update(body, {where:{id: id}});
        res.json( fconsul );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteFinConsulta = async(req, res = response) =>{
    const { id } = req.params;
    try {
        const fconsul = await Fin_Consulta.findByPk( id );
        await fconsul.update({state: false });
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
    getFinConsulta,
    postFinConsulta, 
    putFinConsulta,
    deleteFinConsulta
}