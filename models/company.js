'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, BusinessHour }) {
      // define association here
      this.belongsTo(User, {foreignKey: "createdBy", as:"user"});
      this.hasMany(BusinessHour, {foreignKey: "company", as:"openHours"})
    }
  }
  Company.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    defaultStartingHour: {
      type: DataTypes.TIME
    },
    defaultClosingHour: {
      type: DataTypes.TIME
    },
    phone: {
      type: DataTypes.STRING
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references:{
        model:"Users",
        key:"id"
      },
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};