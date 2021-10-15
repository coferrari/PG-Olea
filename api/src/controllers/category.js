const { Product, Category } = require("../db.js");
const Modelo = require("./index.js");
const productControllers = require("./product.js");
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
      let products = await Product.findAll({
        include: {
          model: Category,
        },
      });
      const productsFiltered = products.filter(p => p.categories.find(c => c.nameCategory === req.params.category));
      res.send(productsFiltered);
    } catch (error) {
      next(error);
    }
  };
  updateName = async (req, res, next) => {
    const { id } = req.params;
    const { nameCategory } = req.body;
    console.log(id);
    try {
      const category = await Category.findByPk(id);
      category.nameCategory = nameCategory;
      category.save();
      res.send("hs");
    } catch (err) {
      next(err);
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
  deleteCategories = async (req, res, next) => {
    const { categoriesID, productID } = req.body;
    try {
      if (categoriesID.length === 1) {
        const producto = await Product.findByPk(productID);
        await Product.findOne({
          where: {
            id: parseInt(productID),
          },
          include: { model: Category },
        });
        producto.removeCategory([categoriesID]);
        res.send(producto);
      }
    } catch (err) {
      next(err);
    }
  };
}

const categoryControllers = new CategoryModel(Category);

module.exports = categoryControllers;
