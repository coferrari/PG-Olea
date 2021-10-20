const { Stores } = require("../db.js");
const Modelo = require("./index.js");

class BrandModel extends Modelo {
  constructor(model) {
    super(model);
  }
}

const storesControllers = new BrandModel(Stores);

module.exports = storesControllers;
