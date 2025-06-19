const {DataTypes} = require("sequelize");

const {sequelize} = require("../config/mysql");

const Roles = sequelize.define(
    "roles",
    {
        descripcion:
        {
            type: DataTypes.STRING
        },
        state:
        {
            type: DataTypes.TINYINT

        }
    },
    {
        timestamps: false
    }
);

module.exports = Roles