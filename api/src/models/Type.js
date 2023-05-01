const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('type', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.ENUM(
          'fighting',
          'normal',
          'ground',
          'flying',
          'poison',
          'bug',
          'fire',
          'steel',
          'ghost',
          'rock',
          'water',
          'grass',
          'ice',
          'psychic',
          'dark',
          'fairy',
          'electric',
          'dragon',
          'shadow',
          'unknown'
        ),
        allowNull: false
    }
  }, {
    timestamps: false,
    freezerTableName: true
  });
}; 