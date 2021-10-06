const { Carrito, Carrito_Products, User } = require("../db.js");
const Modelo = require("./index.js");

class CarritoModel extends Modelo {
  constructor(model) {
    super(model);
  }
  getByID = async (req, res, next) => {
    try {
      const { carritoId } = req.params; 
      const product = await Carrito_Products.findAll({
        where : {
          carritoId
        }
      });
      return res.json(product);
    } catch (error) {
      next(error);
    }
  };
  emptyCart = async (req, res, next) => {
    const { username } = req.body;
    try {
      const user = await User.findOne({
        where: {
          username: username
        }
      })
      const carrito = await this.model.destroy({
        where: {
          userUsername: username
        }
      });
      const newCarrito = await this.model.create()
      user.setCarrito(newCarrito.dataValues.id)
      res.status(200).send(newCarrito);
    } catch (error) {
      next(error);
    }
  };
}



const carritoControllers = new CarritoModel(Carrito);

module.exports = carritoControllers;