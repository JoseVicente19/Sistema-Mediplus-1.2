const {DataTypes} = require("sequelize");
const Usuarios = require('../models/user');
const Paciente = require('../models/paciente');

const {sequelize} = require("../config/mysql");

const Cita =sequelize.define(
    "cita",
    {
        nombre_paciente:
        {
            type: DataTypes.STRING
        },
        medico_atendiendo:
        {
            type: DataTypes.STRING
        },
        fecha:
        {
            type: DataTypes.DATE
        },
        motivo:
        {
            type: DataTypes.STRING
        },
        estado:
        {
            type: DataTypes.STRING
        },
        observaciones:
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

//Cita.belongsTo(Paciente,{
//    foreignKey: 'nombre_paciente'
//});

Cita.belongsTo(Usuarios,{
    foreignKey: 'usersid'
});

module.exports = Cita
