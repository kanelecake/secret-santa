const { Sequelize } = require('sequelize');

let _sequelize;

/**
 * This method used to provide sequelize instance
 * @returns {Sequelize} instance
 */
const getInstance = () => {
    return _sequelize;
}

const connect = () => {
    const name = process.env.DB_NAME;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;

    const params = {
        host: 'localhost',
        dialect: 'mysql',
    };

    _sequelize = new Sequelize(name, user, pass, params);

    return _sequelize;
};

const test = async () => {
    try {
        await _sequelize.authenticate();
        console.error(`>> Successfully connected to database!`);
    } catch (err) {
        console.error(`>> Oops. Can't connect to database. \n`, error);
    }
}

const disconnect = async () => {
    _sequelize.close();
};

module.exports = {
    connect,
    disconnect,
    getInstance,
    test,
};