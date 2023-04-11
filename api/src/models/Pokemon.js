const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {//Nombre
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {//Imagen
      type: DataTypes.TEXT,
      allowNull: false
    },
    live: {//Vida
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {//Ataque
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense: {//Defensa
      type: DataTypes.INTEGER,
      allowNull: false
    },
    velocity: {//Velocidad
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    height: {//Altura
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    weight: {//Peso
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false,
    freezerTableName: true
  });
};
