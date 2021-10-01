const { OrderDetail } = require("../db.js");
const Modelo = require("./index.js");

class OrderDetailModel extends Modelo {
  constructor(model) {
    super(model);
  }
}

const orderDetailControllers = new OrderDetailModel(OrderDetail);

module.exports = orderDetailControllers;
