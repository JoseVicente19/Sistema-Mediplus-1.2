const {Router} = require("express");
const router = Router();

const { getAntecedentes, postAntecedente, putAntecedente, deleteAntecedente } = 
require("../controllers/contollerAnte_personales");

router.get('/', getAntecedentes);
router.post('/', postAntecedente);
router.put('/:id', putAntecedente);
router.delete('/:id', deleteAntecedente);


module.exports = router;