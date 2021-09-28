const { orderDetail } = require("../db.js");
const Modelo = require("./index.js");

let id = 0;

class orderDetailModel extends Modelo {
  constructor(model) {
    super(model);
  }
  //A partir de aca se pueden agregar funciones que necesitemos en la ruta
  orderByStatus = async (req, res, next) => {
    const { status } = req.query;

    if (status === "active") {
      try {
        const orderStatus = await this.model.findAll({
          order: [["Status", "ASC"]],
        });
        res.status(200).send(orderStatus);
      } catch (err) {
        next(err);
      }
    } else if (status === "inactive") {
      try {
        const orderStatus = await this.model.findAll({
          order: [["Status", "DESC"]],
        });
        res.status(200).send(orderStatus);
      } catch (err) {
        next(err);
      }
    }
  };

  createOrder = async (req, res, next) => {};
}

const orderDetailControllers = new orderDetailModel(orderDetail);

module.exports = orderDetailControllers;
