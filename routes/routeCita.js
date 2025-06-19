const {Router} = require("express");
const router = Router();

const { getCitas,
        postCita,
        putCita,
        deleteCita} = require("../controllers/controllerCita");

        router.get('/', getCitas);
        router.post('/', postCita);
        router.put('/:id', putCita);
        router.delete('/:id', deleteCita);

module.exports = router;
