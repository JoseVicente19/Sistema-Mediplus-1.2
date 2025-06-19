const {DataTypes} = require("sequelize");
const Roles = require('../models/roles');

const {sequelize} = require("../config/mysql");

const User = sequelize.define(
    "users",
    {
        user:
        {
            type: DataTypes.STRING
        },
        password:
        {
            type: DataTypes.STRING
        },
        state:
        {
            type: DataTypes.TINYINT
        },
        nombre_p:
        {
            type: DataTypes.STRING
        },
        telefono:
        {
            type: DataTypes.STRING
        },
        correo:
        {
            type: DataTypes.STRING
        },
        horario:
        {
            type: DataTypes.STRING
        },
        rolesid:
        {
            type: DataTypes.INTEGER
        },

    },
    {
        timestamps: true
    }
);

User.belongsTo(Roles,{
    foreignKey: 'rolesid'
});



module.exports = User