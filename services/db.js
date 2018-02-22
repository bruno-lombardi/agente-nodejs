const Sequelize = require('sequelize');
const debug = require('debug')('agente-esp:db');
const keys = require('../config/keys');
const sequelize = new Sequelize(keys.mysqlURI, {logging: false});

sequelize
  .authenticate()
  .then(() => {
    debug('Db connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.import(__dirname + '/models/User');
User.sync({alter: true});

module.exports = {
  models: {
    User
  }
};
