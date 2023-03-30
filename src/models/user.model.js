const { DataTypes } = require('sequelize');
const sequelize = require('./../configs/database').connect();

const model = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    wish: DataTypes.STRING,
    recipient: DataTypes.INTEGER,
});

sequelize.sync();
module.exports = model;