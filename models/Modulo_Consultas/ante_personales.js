const {DataTypes} = require("sequelize");

const {sequelize} = require("../../config/mysql");

const Ante_personales = sequelize.define(
    "ante_personales",
    {
        medicos:
        {
            type: DataTypes.STRING
        },
        quirurjicos:
        {
            type: DataTypes.STRING
        },
        traumaticos:
        {
            type: DataTypes.STRING
        },
        alergicos:
        {
            type: DataTypes.STRING
        },
        familiares:
        {
            type: DataTypes.STRING
        },
        inmunizaciones:
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

module.exports = Ante_personales
