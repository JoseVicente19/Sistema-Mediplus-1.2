const {Router} = require("express");
const router = Router();

const { getPacientes, postPaciente, putPaciente, deletePaciente, getPacienteById} = 
require("../controllers/controllerPaciente");

router.get('/', getPacientes);
router.get('/:id', getPacienteById );
router.post('/', postPaciente);
router.put('/:id', putPaciente);
router.delete('/:id', deletePaciente);

module.exports = router;