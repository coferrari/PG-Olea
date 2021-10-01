const { Carrito } = require("../db.js");
const Modelo = require("./index.js");

class CarritoModel extends Modelo {
  constructor(model) {
    super(model);
  }
}

const carritoControllers = new CarritoModel(Carrito);

module.exports = brandControllers;
