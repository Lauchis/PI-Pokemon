const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  
  // ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
  // Nombre *
  // Vida
  // Fuerza
  // Defensa
  // Velocidad
  // Altura
  // Peso

  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //vida
    hp: {
      type: DataTypes.INTEGER,
    },
    //fuerza
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.TEXT,
    }
  });
};
