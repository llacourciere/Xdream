const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class DreamTag extends Model {}

DreamTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dream_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'dream',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dream_tag',
  }
);

module.exports = DreamTag;
