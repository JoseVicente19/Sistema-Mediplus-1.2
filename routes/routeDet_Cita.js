const {Router} = require("express");
const router = Router();

const { getDetalle, postDetalle, putDetalle, deleteDetalle} = 
require("../controllers/controllerDet_Cita");

router.get('/', getDetalle);
router.post('/', postDetalle);
router.put('/:id', putDetalle);
router.delete('/:id', deleteDetalle);


module.exports = router;