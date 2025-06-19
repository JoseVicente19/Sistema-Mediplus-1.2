const {response, request} = require("express");
const MHR = require('../models/Modulo_Consultas/MHR');

const getMhr = async (req = request, res = response) => {
    const mhr = await MHR.findAll(
        {
            where: {
                state: true
            },
        });
    if (mhr) {
        res.json({mhr})
    }else{
        res.status(404).json({
            msg: 'No se encotraron los datos'});
    }

}

const postMhr = async (req = request, res = response) => {
    const { mc, hea, rsx } = req.body;
    try {
        const result = await MHR.create({ mc, hea, rsx });
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

const putMhr = async(req = request, res = response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const mhr = await MHR.findByPk( id );
        await mhr.update(body, {where:{id: id}});
        res.json( mhr );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

const deleteMhr = async(req, res = response) =>{
    const { id } = req.params;
    try {
        const mhr = await MHR.findByPk( id );
        await mhr.update({state: false });
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
    getMhr,
    postMhr, 
    putMhr,
    deleteMhr
}
