const Sequelize = require('sequelize');
const debug = require('debug')('agente-esp:db');
const sequelize = new Sequelize('mysql://root@localhost:3306/agente');

sequelize
  .authenticate()
  .then(() => {
    debug('Db connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.import(__dirname + '/models/User');
User.sync({force: true});

module.exports = {
  models: {
    User
  }
};
