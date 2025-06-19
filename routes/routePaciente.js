const {Router} = require("express");
const router = Router();

const { getPacientes, postPaciente, putPaciente, deletePaciente} = 
require("../controllers/controllerPaciente");

router.get('/', getPacientes);
router.post('/', postPaciente);
router.put('/:id', putPaciente);
router.delete('/:id', deletePaciente);

module.exports = router;