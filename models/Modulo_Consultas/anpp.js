const {DataTypes} = require("sequelize");

const {sequelize} = require("../../config/mysql");

const ANPP = sequelize.define(
    "anpp",
    {
        micciona:
        {
            type: DataTypes.INTEGER
        },
        defeca:
        {
            type: DataTypes.INTEGER
        },
        dieta:
        {
            type: DataTypes.STRING
        },
        tabaco:
        {
            type: DataTypes.STRING
        },
        alcohol:
        {
            type: DataTypes.STRING
        },
        drogas:
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

module.exports = ANPP