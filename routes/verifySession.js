const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authenticated } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/ValidarCampos");

router.post('/', [
    check('token', 'no se obtuvo el token').notEmpty(),
    validarCampos
], authenticated);

module.exports = router;
