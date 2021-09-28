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
        res.status(400).send({ error: err });
      }
    } else if (status === "inactive") {
      try {
        const orderStatus = await this.model.findAll({
          order: [["Status", "DESC"]],
        });
        res.status(200).send(orderStatus);
      } catch (err) {
        res.status(400).send({ error: err });
      }
    }
  };

  orderByDate = async (req, res, next) => {
    const { type } = req.query;

    if (type === "ASC") {
      try {
        const orderDate = await this.model.findAll({
          order: [["createdAt", "ASC"]],
        });
        res.status(200).send(orderDate);
      } catch (err) {
        res.status(400).send({ error: err });
      }
    } else if (type === "DES") {
      try {
        const orderDate = await this.model.findAll({
          order: [["createdAt", "DESC"]],
        });
        res.status(200).send(orderDate);
      } catch (err) {
        res.status(400).send({ error: err });
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
        res.status(400).send({ error: err });
      }
    }
  };
}

const orderDetailControllers = new orderDetailModel(orderDetail);

module.exports = orderDetailControllers;
