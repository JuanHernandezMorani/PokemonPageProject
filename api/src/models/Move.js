const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Move', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
        }
    },
    {
      timestamps: false
    });
}