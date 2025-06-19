const {response, request} = require("express");
const ANPP = require('../models/Modulo_Consultas/anpp');

const getAnpp = async (req = request, res = response) => {
    const anpp = await ANPP.findAll(
        {
            where: {
                state: true
            },
        });
    if (anpp) {
        res.json({anpp})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }

}

const postAnpp = async (req = request, res = response) => {
    const {micciona, defeca, dieta, tabaco, alcohol, drogas} = req.body;
    try {
        const result = await ANPP.create({micciona, defeca, dieta, tabaco, alcohol, drogas});
        res.json({
            msg: 'Seccion ANPP ingresada correctamente',
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putAnpp = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const anpp = await ANPP.findByPk( id );
        await anpp.update(body, {where:{id: id}});
        res.json( anpp );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteAnpp = async(req, res = response) =>{
    const { id } = req.params;
    try {
        const anpp = await ANPP.findByPk( id );
        await anpp.update({state: false });
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
        getAnpp,
        postAnpp,
        putAnpp,
        deleteAnpp
}