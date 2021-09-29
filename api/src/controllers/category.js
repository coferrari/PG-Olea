const { Category } = require("../db.js");
const Modelo = require("./index.js");

class CategoryModel extends Modelo {
  constructor(model) {
    super(model);
  }
}

const categoryControllers = new CategoryModel(Category);

module.exports = categoryControllers;
