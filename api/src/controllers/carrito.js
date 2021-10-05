const { Carrito, Carrito_Products } = require("../db.js");
const Modelo = require("./index.js");

class CarritoModel extends Modelo {
  constructor(model) {
    super(model);
  }
  getByID = async (req, res, next) => {
    try {
      const { carritoId } = req.params; 
      const product = await Carrito_products.findAll({
        where : {
          carritoId
        }
      });
      return res.json(product);
    } catch (error) {
      next(error);
    }
  };
}

const carritoControllers = new CarritoModel(Carrito);

module.exports = carritoControllers;
