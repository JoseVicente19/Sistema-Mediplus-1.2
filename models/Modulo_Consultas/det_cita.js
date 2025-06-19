const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/mysql");

const Usuarios = require('../user');
const ANPP = require('./anpp');
const Fin_Consulta = require('./fin_consulta');
const MHR = require('./MHR');
const Ante_Personales = require('./ante_personales');
const Examen_Fisico = require('./examen_fisico');
const Paciente = require('../paciente');

const Det_cita =sequelize.define(
    "det_cita",
    {
        tipo:
        {
            type: DataTypes.STRING
        },
        usersid:
        {
            type: DataTypes.INTEGER
        },
        anpp_id:
        {
            type: DataTypes.INTEGER
        },
        fin_consulta_id:
        {
            type: DataTypes.INTEGER
        },
        mc_hea_rsx_id:
        {
            type: DataTypes.INTEGER
        },
        ante_personales_id:
        {
            type: DataTypes.INTEGER
        },
        examen_fisico_id:
        {
            type: DataTypes.INTEGER
        },
        pacientes_id:
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

Det_cita.belongsTo(Usuarios,{
    foreignKey: 'usersid'
});

Det_cita.belongsTo(ANPP,{
    foreignKey: 'anpp_id'
});

Det_cita.belongsTo(Fin_Consulta,{
    foreignKey: 'fin_consulta_id'
});

Det_cita.belongsTo(MHR,{
    foreignKey: 'mc_hea_rsx_id'
});

Det_cita.belongsTo(Ante_Personales,{
    foreignKey: 'ante_personales_id'
});

Det_cita.belongsTo(Examen_Fisico,{
    foreignKey: 'examen_fisico_id'
});

Det_cita.belongsTo(Paciente,{
    foreignKey: 'pacientes_id'
});


module.exports = Det_cita
