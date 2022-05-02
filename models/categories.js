const { DataTypes } = require('sequelize');

const Attributes = {
  name: {
    type: DataTypes.STRING,
  },
};

module.exports = (sequelize) => {
  const Categories = sequelize.define(
    'Categories',
    Attributes,
    {
      timestamps: false,
      tableName: 'Categories',
    },
  );

  return Categories;
};