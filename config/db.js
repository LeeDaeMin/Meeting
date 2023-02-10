const Sequelize = require('sequelize');

module.exports = new Sequelize('meeti', 'postgres', 'yiyo19357', {
    host: '127.0.0.1',
    port: '5433',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}); 