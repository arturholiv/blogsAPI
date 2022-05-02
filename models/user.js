const { DataTypes } = require('sequelize');

const Attributes = {
  displayName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
};

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    Attributes,
    {
      // underscored: true, // converts camelcase automaticaly
      timestamps: false,
      // tableName: 'Users',
    },
  );

  return User;
};