const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const MHR = require('./MHR');
const Examen_Fisico = require('./examen_fisico');
const Paciente = require('../paciente');

const reconsulta = sequelize.define(
    "reconsulta",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comentario: {
            type: DataTypes.STRING
        },
        mc_hea_rsx_id: {
            type: DataTypes.INTEGER
        },
        examen_fisico_id: {
            type: DataTypes.INTEGER
        },
        pacientes_id: {
            type: DataTypes.INTEGER
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        state: {
            type: DataTypes.TINYINT,
            defaultValue: 1
        },
    },
    {
        timestamps: false
    }
);

reconsulta.belongsTo(MHR, {
    foreignKey: 'mc_hea_rsx_id'
});

reconsulta.belongsTo(Examen_Fisico, {
    foreignKey: 'examen_fisico_id'
});

reconsulta.belongsTo(Paciente, {
    foreignKey: 'pacientes_id'
});

module.exports = reconsulta;