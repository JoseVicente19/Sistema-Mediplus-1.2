const {DataTypes} = require("sequelize");
const Usuarios = require('../models/user');

const {sequelize} = require("../config/mysql");

const Paciente =sequelize.define(
    "paciente",
    {
        nombre:
        {
            type: DataTypes.STRING
        },
        apellido:
        {
            type: DataTypes.STRING
        },
        fecha_nac:
        {
            type: DataTypes.DATE
        },
        edad:
        {
            type: DataTypes.STRING
        },
        sexo:
        {
            type: DataTypes.STRING
        },
        origen:
        {
            type: DataTypes.STRING
        },
        direccion:
        {
            type: DataTypes.STRING
        },
        escolaridad:
        {
            type: DataTypes.STRING
        },
        ocupacion:
        {
            type: DataTypes.STRING
        },
        estado_civil:
        {
            type: DataTypes.STRING
        },
        religion:
        {
            type: DataTypes.STRING
        },
        correo:
        {
            type: DataTypes.STRING
        },
        telefono:
        {
            type: DataTypes.STRING
        },
        usersid:
        {
            type: DataTypes.INTEGER
        },
        state:
        {
            type: DataTypes.TINYINT
        },
    },
    {
        timestamps: false
    }
);

Paciente.belongsTo(Usuarios,{
    foreignKey: 'usersid'
});

module.exports = Paciente