const {
  Reviews,
  Product,
  Category,
  User,
  Carrito,
  Carrito_Products,
} = require("../db.js");
const { Op } = require("sequelize");
const Modelo = require("./index.js");

var id = 0;

class ProductModel extends Modelo {
  constructor(model) {
    super(model);
  }

  create = async (req, res, next) => {
    try {
      const {
        name,
        price,
        image,
        description,
        rating,
        stock,
        categoryID,
        newItem,
      } = req.body;
      var newItemProduct = await this.model.create({
        name,
        price,
        image,
        description,
        rating,
        id: id,
        stock,
        newItem,
      });
      console.log(categoryID);
      await newItemProduct.addCategories(categoryID);
      return res.send("done");
    } catch (error) {
      next(error);
    }
  };
  orderByPrice = async (req, res, next) => {
    const { price } = req.params;

    if (price === "ASC") {
      try {
        const orderPrice = await this.model.findAll({
          order: [["price", "ASC"]],
        });
        res.status(200).send(orderPrice);
      } catch (err) {
        next(err);
      }
    } else if (price === "DES") {
      try {
        const orderPrice = await this.model.findAll({
          order: [["price", "DESC"]],
        });
        res.status(200).send(orderPrice);
      } catch (err) {
        next(err);
      }
    }
  };
  orderByName = async (req, res, next) => {
    const { name } = req.params;
    if (name === "ASC") {
      try {
        const orderAZ = await this.model.findAll({
          order: [["name", "ASC"]],
        });
        res.status(200).send(orderAZ);
      } catch (err) {
        next(err);
      }
    } else if (name === "DES") {
      try {
        const orderZA = await this.model.findAll({
          order: [["name", "DESC"]],
        });
        res.status(200).send(orderZA);
      } catch (err) {
        next(err);
      }
    }
  };
  orderByRating = async (req, res, next) => {
    const { rating } = req.params;
    if (rating === "ASC") {
      try {
        const orderRating = await this.model.findAll({
          order: [["rating", "ASC"]],
        });
        res.status(200).send(orderRating);
      } catch (err) {
        next(err);
      }
    } else if (rating === "DES") {
      try {
        const orderRating = await this.model.findAll({
          order: [["rating", "DESC"]],
        });
        res.status(200).send(orderRating);
      } catch (err) {
        next(err);
      }
    }
  };
  getAll = (req, res, next) => {
    const product = this.model.findAll({
      include: [
        {
          model: Category,
        },
        { model: Reviews },
      ],
    });

    product
      .then((results) => {
        res.send(results);
      })
      .catch((error) => next(error));
  };
  addOrEditProduct = async (req, res, next) => {
    const { productID, username, quantity } = req.body;
    const producto = await this.model.findByPk(productID);
    const user = await User.findOne({
      where: { username: username },
      include: Carrito,
    });
    if (user.dataValues.carrito !== null && producto) {
      await user.dataValues.carrito.addProduct(producto.id);
      if (quantity >= 1) {
        await Carrito_Products.update(
          { quantity: quantity },
          {
            where: {
              productId: producto.id,
              carritoId: user.dataValues.carrito.dataValues.id,
            },
          }
        );
      }
      return res.status(200).send(user.dataValues.carrito);
    }
    return res.status(404).send("este usuario no tiene un carrito");
  };
  createCartLogin = async (req, res, next) => {
    const { username, products } = req.body;
    const user = await User.findOne({
      where: { username: username },
      include: Carrito,
    });
    if (user.dataValues.carrito !== null && products.length) {
      for (let i = 0; i <= products.length - 1; i++) {
        const result = await this.model.findByPk(products[i].id);
        await user.dataValues.carrito.addProduct(products[i].id);
        await Carrito_Products.update(
          { quantity: products[i].quantity },
          {
            where: {
              productId: products[i].id,
              carritoId: user.dataValues.carrito.dataValues.id,
            },
          }
        );
      }
      return res.status(200).send(user.dataValues.carrito);
    }
    return res.status(404).send("este usuario no tiene un carrito");
  };
  deleteProduct = async (req, res, next) => {
    const { productID, username } = req.body;
    try {
      const user = await User.findOne({
        where: { username: username },
        include: Carrito,
      });
      const carritoUser = await Carrito.findOne({
        where: {
          id: user.dataValues.carrito.dataValues.id,
        },
        include: { model: Product },
      });
      carritoUser.removeProducts([productID]);
      res.status(200).send(carritoUser);
    } catch (error) {
      next(error);
    }
  };
  searchName = async (req, res, next) => {
    const { name } = req.query;
    if (name) {
      const result = await this.model.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
      });
      res.status(200).json(result);
    }
  };
  searchById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const product = await Product.findByPk(id, { include: Category });

      if (product) {
        res.status(200).send(product);
      } else if (!product) {
        res.status(404).send("no hay un producto con ese id");
      }
    } catch (err) {
      next(err);
    }
  };

  editStock = async (req, res, next) => {
    const { stock, productID } = req.body;
    try {
      this.model.update(
        {
          stock: stock,
        },
        {
          where: {
            id: productID,
          },
        }
      );
      res.status(200).send("updated");
    } catch (err) {
      next(err);
    }
  };
  inOffer = async (req, res, next) => {
    const { productID, inOffer, offerDay } = req.body;
    console.log(productID, inOffer, offerDay);
    try {
      const product = await this.model.findByPk(productID);
      await product.update({
        offer: inOffer,
        offerday: offerDay,
      });
      res.status(200).send(product);
    } catch (err) {
      next(err);
    }
  };
}

const productControllers = new ProductModel(Product);

module.exports = productControllers;
