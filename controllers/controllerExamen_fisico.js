const {response, request} = require("express");
const Examen_Fisico = require('../models/Modulo_Consultas/examen_fisico');

const getExamenes = async (req = request, res = response) => {
    const examen = await Examen_Fisico.findAll(
        {
            where: {
                state: true
            },
        });
    if (examen) {
        res.json({examen})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }

}

const postExamen = async (req = request, res = response) => {
    const {p_a, fc, fr, temperatura, so2, peso, talla, imc, gmt, comentario} = req.body;
    try {
        const result = await Examen_Fisico.create({p_a, fc, fr, temperatura, so2, peso, talla, 
            imc, gmt, comentario});
        res.json({
            msg: 'Examen fisico agregado correctamente',
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putExamen = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const examen = await Examen_Fisico.findByPk( id );
        await examen.update(body, {where:{id: id}});
        res.json( examen );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteExamen = async(req, res = response) =>{
    const { id } = req.params;
    try {
        const examen = await Examen_Fisico.findByPk( id );
        await examen.update({state: false });
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
    getExamenes,
    postExamen, 
    putExamen,
    deleteExamen
}