const { DataTypes } = require('sequelize');
const sequelize = require('./../configs/database').connect();

const model = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    participants: DataTypes.STRING,
});

sequelize.sync();
module.exports = model;