const { User } = require("../db.js");
const Modelo = require("./index.js");

class UserModel extends Modelo {
  constructor(model) {
    super(model);
  }
  //A partir de aca se pueden agregar funciones que necesitemos en la ruta
}

const userControllers = new UserModel(User);

module.exports = userControllers;
