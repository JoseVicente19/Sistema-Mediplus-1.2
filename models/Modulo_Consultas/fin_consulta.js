const {DataTypes} = require("sequelize");

const {sequelize} = require("../../config/mysql");

const Fin_Consulta = sequelize.define(
    "fin_consulta",
    {
        diagnostico:
        {
            type: DataTypes.STRING
        },
        trat_intrahospitalario:
        {
            type: DataTypes.STRING
        },
        plan_de_accion:
        {
            type: DataTypes.STRING
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


module.exports = Fin_Consulta
