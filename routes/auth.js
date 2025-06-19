const express = require('express');
const router = express.Router();

const {check} = require('express-validator');
const {login} = require('../controllers/auth');
const { validarCampos } = require("../middlewares/ValidarCampos");

router.post('/',[
    check('username', 'El correo no es valido').notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
],  login);

module.exports = router;