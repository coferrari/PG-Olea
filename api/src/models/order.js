const { DataTypes, STRING } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("creada", "procesando", "cancelada", "finalizada"),
      allowNull: false,
      defaultValue: "creada",
    },
    statusPago: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pendiente",
    },
    info: {
      type: DataTypes.ENUM("retiro", "en-espera", "en-camino", "entregada"),
      allowNull: false,
      defaultValue: "retiro",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactSurname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
