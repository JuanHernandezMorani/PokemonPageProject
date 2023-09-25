const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Ability', {
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