const {Router} = require("express");
const router = Router();

const { getFinConsulta, postFinConsulta, putFinConsulta, deleteFinConsulta} = 
require("../controllers/controllerFin_consulta");

router.get('/', getFinConsulta);
router.post('/', postFinConsulta);
router.put('/:id', putFinConsulta);
router.delete('/:id', deleteFinConsulta);


module.exports = router;