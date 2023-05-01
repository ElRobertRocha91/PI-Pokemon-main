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
      unique: true, //Restricción STRING UNIQUE: el nombre de Pokemon será unico, arrojara error si se intenta insertar un nombre que ya existe.
    },
    image: {//Imagen
      type: DataTypes.TEXT,
      allowNull: false
    },
    live: {//Vida
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1,
        max: 275
      }
    },
    attack: {//Ataque
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1,
        max: 275
      }
    },
    defense: {//Defensa
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1,
        max: 275
      }
    },
    velocity: {//Velocidad
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 275
      }
    },
    height: {//Altura
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 275
      }
    },
    weight: {//Peso
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 275
      }
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
