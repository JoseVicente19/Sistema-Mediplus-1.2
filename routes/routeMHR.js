const {Router} = require("express");
const router = Router();

const { getMhr, postMhr, putMhr, deleteMhr} = 
require("../controllers/controllerMHR");

router.get('/', getMhr);
router.post('/', postMhr);
router.put('/:id', putMhr);
router.delete('/:id', deleteMhr);


module.exports = router;