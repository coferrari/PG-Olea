const { Order } = require("../db.js");
const Modelo = require("./index.js");
class OrderModel extends Modelo {
  constructor(model) {
    super(model);
  }
  //A partir de aca se pueden agregar funciones que necesitemos en la ruta
  orderByStatus = async (req, res, next) => {
    const { status } = req.params;

    if (status === "active") {
      try {
        const orderStatus = await this.model.findAll({
          order: [["status", "ASC"]],
        });
        res.status(200).send(orderStatus);
      } catch (err) {
        next(err);
      }
    } else if (status === "inactive") {
      try {
        const orderStatus = await this.model.findAll({
          order: [["status", "DESC"]],
        });
        res.status(200).send(orderStatus);
      } catch (err) {
        next(err);
      }
    }
  };

  orderByDate = async (req, res, next) => {
    const { date } = req.params;

    if (date === "ASC") {
      try {
        const orderDate = await this.model.findAll({
          order: [["createdAt", "ASC"]],
        });
        res.status(200).send(orderDate);
      } catch (err) {
        next(err);
      }
    } else if (date === "DES") {
      try {
        const orderDate = await this.model.findAll({
          order: [["createdAt", "DESC"]],
        });
        res.status(200).send(orderDate);
      } catch (err) {
        next(err);
      }
    }
  };

  filterByStatus = async (req, res, next) => {
    const { status } = req.params;

    if (status) {
      const order = await this.model.findAll({
        where: {
          status,
        },
      });
      if (order.length >= 1) {
        res.status(200).json(order);
      } else {
        next(err);
      }
    }
  };
  create = async (req, res, next) => {
    
  }
}

const OrderControllers = new OrderModel(Order);

module.exports = OrderControllers;
