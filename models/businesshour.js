'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessHour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Company}) {
      // define association here
      this.belongsTo(Company, {foreignKey: "company", as:"companyData"});
    }
  }
  BusinessHour.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isClosingDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    startingHour: {
      type: DataTypes.TIME
    },
    closingHour: {
      type: DataTypes.TIME
    },
    company: {
      type: DataTypes.INTEGER,
      references: {
        model: "Companies",
        key: "id"
      }
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
    modelName: 'BusinessHour',
  });
  return BusinessHour;
};