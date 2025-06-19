const {DataTypes} = require("sequelize");

const {sequelize} = require("../../config/mysql");

const MHR =sequelize.define(
    "mc_hea_rsx",
    {
        mc:
        {
            type: DataTypes.STRING
        },
        hea:
        {
            type: DataTypes.STRING
        },
        rsx:
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

module.exports = MHR
