const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    socialID: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null 
    },
    socialIDProvider: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        min: 6
      },
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(8), null))
      }
    }
  }, {
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      }
    }
  })
}