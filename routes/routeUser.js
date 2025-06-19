const {Router} = require("express");
const router = Router();

const { getUsuarios, postUsuario, putUsuario, deleteUsuario, getOnlyUser } = 
require("../controllers/controllerUser");


router.get('/', getUsuarios);
router.get('/:id', getOnlyUser);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);


module.exports = router;