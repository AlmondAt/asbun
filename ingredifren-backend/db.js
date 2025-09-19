// Database connection setup using Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME || 'asbun', process.env.DB_USER || 'root', process.env.DB_PASS || '', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
});

const models = require('./models')(sequelize);

module.exports = { sequelize, ...models };
