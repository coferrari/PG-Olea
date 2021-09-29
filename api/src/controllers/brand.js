const { Brand } = require("../db.js");
const Modelo = require("./index.js");

class BrandModel extends Modelo {
  constructor(model) {
    super(model);
  }
}

const brandControllers = new BrandModel(Brand);

module.exports = brandControllers;
