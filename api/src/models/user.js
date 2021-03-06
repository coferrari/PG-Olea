const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    adress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    newsLetter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,


      defaultValue: true

    },
    codeVerification: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    almacen: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    cosmetica: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    decoracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  });
};
