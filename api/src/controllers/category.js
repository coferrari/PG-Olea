const { Product, Category } = require("../db.js");
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

  filterByCategory = async (req, res, next) => {
    try {
      let productsFiltered = await Product.findAll({
        include: {
          model: Category,
        },
      });
      productsFiltered = productsFiltered.filter(
        (p) => p.categories[0].nameCategory === req.params.category
      );
      res.send(productsFiltered);
    } catch (error) {
      next(error);
    }
  };

  addCategories = async (req, res, next) => {
    const { categoriesID, productID } = req.body;
    try {
      if (categoriesID.length > 1) {
        const producto = await Product.findByPk(productID);
        if (producto) {
          return res.json(await producto.addCategories(categoriesID));
        } else {
          res.status(404).send("No hay un producto con ese ID");
        }
      } else if (categoriesID.length === 1) {
        const producto = await Product.findByPk(productID);
        if (producto) {
          res.json(await producto.addCategory(categoriesID));
        } else {
          res.status(404).send("No hay un producto con ese ID");
        }
      }
    } catch (err) {
      next(err);
    }
  };
}

const categoryControllers = new CategoryModel(Category);

module.exports = categoryControllers;
