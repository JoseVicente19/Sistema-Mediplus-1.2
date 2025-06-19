const {DataTypes} = require("sequelize");

const {sequelize} = require("../../config/mysql");

const Examen_Fisico = sequelize.define(
    "examen_fisico",
    {
        p_a:
        {
            type: DataTypes.FLOAT
        },
        fc:
        {
            type: DataTypes.FLOAT
        },
        fr:
        {
            type: DataTypes.FLOAT
        },
        temperatura:
        {
            type: DataTypes.FLOAT
        },
        so2:
        {
            type: DataTypes.FLOAT
        },
        peso:
        {
            type: DataTypes.FLOAT
        },
        talla:
        {
            type: DataTypes.FLOAT
        },
        imc:
        {
            type: DataTypes.FLOAT
        },
        gmt:
        {
            type: DataTypes.FLOAT
        },
        comentario:
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

module.exports = Examen_Fisico
