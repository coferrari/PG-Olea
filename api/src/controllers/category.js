const { Category, Product } = require("../db.js");
const Modelo = require("./index.js");

class CategoryModel extends Modelo {
  constructor(model) {
    super(model);
  }
  getAll = (req, res, next) => {
    const Users = this.model.findAll({
      include: {
        model: Product,
      },
    });
    Users.then((results) => {
      res.send(results);
    }).catch((error) => next(error));
  };
}

const categoryControllers = new CategoryModel(Category);

module.exports = categoryControllers;
