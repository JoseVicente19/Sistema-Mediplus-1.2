const {Router} = require("express");
const router = Router();

const { getAnpp, postAnpp, putAnpp, deleteAnpp } = require("../controllers/controllerAnpp");

router.get('/', getAnpp);
router.post('/', postAnpp);
router.put('/:id', putAnpp);
router.delete('/:id', deleteAnpp);


module.exports = router;