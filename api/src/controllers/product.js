const { Product } = require("../db.js");
const Modelo = require("./index.js");

class ProductModel extends Modelo {
  constructor(model) {
    super(model);
  }
  // createProduct = async (req,res,next) => {

  // }
}

const productControllers = new ProductModel(Product);

module.exports = productControllers;
