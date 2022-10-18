const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Dream extends Model {}

Dream.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // public: {
        //     type: DataType.BOOLEAN,
        // },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id'
            }
        },  
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'dream'
    }
);


module.exports = Dream;