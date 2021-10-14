const { Order, Order_Products, Product, User } = require("../db.js");
const Modelo = require("./index.js");
const {
  getTemplateAproved,
  sendEmail,
  getTemplateRejected,
} = require("../helpers/mail");
class OrderModel extends Modelo {
  constructor(model) {
    super(model);
  }
  //A partir de aca se pueden agregar funciones que necesitemos en la ruta
  changeStatus = async (req, res, next) => {
    const { estado } = req.body;
    const { id } = req.params;
    console.log("estado", estado);
    console.log("entre");
    try {
      let state;
      estado === "approved"
        ? (state = "finalizada")
        : estado === "reject"
        ? (state = "cancelada")
        : (state = "procesando");
      console.log(state);
      const ordenDetail = await this.model.findByPk(id, { include: Product });
      ordenDetail.status = state;
      ordenDetail.statusPago = estado;
      ordenDetail.save();
      if (estado === "approved") {
        ordenDetail.products.forEach(async (p) => {
          let x = await Product.findByPk(p.id);
          let cantidad = p["Order_Products"].quantity;
          let nuevoStock = x.stock - cantidad;
          x.stock = nuevoStock;
          x.save();
        });
        let template = getTemplateAproved(
          ordenDetail.contactName,
          ordenDetail.price
        );
        await sendEmail(ordenDetail.email, "Pago exitoso", template);
        return res.json({
          message: "Se actualizo el estado de la orden y se cambio el stock",
        });
      }
      if (estado === "rejected") {
        let template = getTemplateRejected(ordenDetail.contactName);
        await sendEmail(ordenDetail.email, "Problema en la compra", template);
        return res.json({
          message: "Se envio el mail, compra rechazada.",
        });
      }
      res.json({
        message: "Se actualizo el estado de la orden",
        order: ordenDetail,
      });
    } catch (err) {
      next(err);
    }
  };
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
  createOrder = async (req, res, next) => {
    const {
      username,
      email,
      price,
      products,
      address,
      phone,
      contactName,
      contactSurname,
    } = req.body;
    try {
      console.log("entre");
      console.log(email);
      const ordenCreada = await this.model.create({
        //userUsername: username,
        email,
        price,
        address,
        phone,
        contactName,
        contactSurname,
        date: Date().slice(0, 10).replace(/-/g, "/"),
      });
      for (let i = 0; i < products.length; i++) {
        await ordenCreada.addProduct(products[i].id);
        await Order_Products.update(
          { quantity: products[i].quantity },
          {
            where: {
              orderId: ordenCreada.id,
              productId: products[i].id,
            },
          }
        );
      }
      const user = await User.findByPk(username);
      await user.addOrder(ordenCreada.id);
      res.json(ordenCreada);
    } catch (error) {
      next(error);
    }
  };
  setOrderStatus = async (req, res, next) => {
    const { status, orderID } = req.body;
    try {
      const orden = await this.model.findByPk(orderID, { include: Product });
      orden.update(
        {
          status: status,
        },
        {
          where: {
            id: orderID,
          },
        }
      );
      res.status(200).send(orden);
    } catch (err) {
      next(err);
    }
  };
  allOrders = async (req, res, next) => {
    //const { username } = req.body;
    try {
      const order = await this.model.findAll({
        //where: { userUsername: username },
        include: Product,
      });
      res.status(200).send(order);
    } catch (err) {
      next(err);
    }
  };
  getOrderDetails = async (req, res, next) => {
    //const { username } = req.body
    const { id } = req.params;
    console.log(id);
    try {
      const ordenDetail = await this.model.findByPk(id, { include: Product });
      res.send(ordenDetail).status(200);
    } catch (error) {
      next(error);
    }
  };

  getUserOrder = async (req, res, next) => {
    const { username } = req.params;
    console.log(req.params, "params");
    try {
      const user = await User.findByPk(username, { include: Order });
      res.send(user);
    } catch (error) {
      next(error);
    }
  };
}

const OrderControllers = new OrderModel(Order);

module.exports = OrderControllers;
