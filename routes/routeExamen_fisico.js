const {Router} = require("express");
const router = Router();

const { getExamenes, postExamen, putExamen, deleteExamen } = 
require("../controllers/controllerExamen_fisico");

router.get('/', getExamenes);
router.post('/', postExamen);
router.put('/:id', putExamen);
router.delete('/:id', deleteExamen);


module.exports = router;