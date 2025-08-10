const { Router } = require("express");
const router = Router();

const { 
    getAllReconsultas,
    getReconsultas, 
    postReconsulta, 
    putReconsulta, 
    deleteReconsulta,
    getReconsultaById
} = require("../controllers/controllerReconsulta");

//rutas especificas
router.get('/detalle/:id', getReconsultaById); 
router.get('/:pacienteId', getReconsultas);

//rutas no especificas
router.get('/', getAllReconsultas);
router.post('/', postReconsulta);
router.put('/:id', putReconsulta);
router.delete('/:id', deleteReconsulta);

module.exports = router;