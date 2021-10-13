const { DataTypes, STRING } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    newItem: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    SKU: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    offer: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
  });
};
