const {
  Order,
  Order_Products,
  Product,
  User,
  Carrito,
  Turn,
} = require("../db.js");
const Modelo = require("./index.js");
const {
  getTemplateAproved,
  sendEmail,
  getTemplateRejected,
  getTemplateEnvio,
  getTemplateEnCamino,
} = require("../helpers/mail");
class OrderModel extends Modelo {
  constructor(model) {
    super(model);
  }
  //A partir de aca se pueden agregar funciones que necesitemos en la ruta
  changeStatus = async (req, res, next) => {
    const { estado } = req.body;
    const { id } = req.params;

    try {
      let state;
      estado === "approved"
        ? (state = "finalizada")
        : estado === "rejected"
        ? (state = "cancelada")
        : (state = "procesando");
      const ordenDetail = await this.model.findByPk(id, { include: Product });
      ordenDetail.status = state;
      ordenDetail.statusPago = estado;
      ordenDetail.save();
      const userNew = await User.findOne({
        where: {
          username: ordenDetail.userUsername,
        },
      });
      await Carrito.destroy({
        where: {
          userUsername: ordenDetail.userUsername,
        },
      });
      const newCarrito = await Carrito.create();
      userNew.setCarrito(newCarrito.dataValues.id);
      if (estado === "approved") {
        ordenDetail.products.forEach(async (p) => {
          let x = await Product.findByPk(p.id);
          let cantidad = p["Order_Products"].quantity;
          let nuevoStock = x.stock - cantidad;
          x.stock = nuevoStock;
          x.save();
        });
        if (ordenDetail.info === "retiro") {
          let template = getTemplateAproved(
            ordenDetail.contactName,
            ordenDetail.price
          );
          await sendEmail(ordenDetail.email, "Pago exitoso", template);
        }
        if (ordenDetail.info === "en-espera") {
          ordenDetail.status = "procesando";
          ordenDetail.save();
          let template = getTemplateEnvio(
            ordenDetail.contactName,
            ordenDetail.price
          );
          await sendEmail(ordenDetail.email, "Pago exitoso", template);
        }
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
    if (date === "masReciente") {
      try {
        const orderDate = await this.model.findAll({
          order: [["createdAt", "ASC"]],
        });
        res.status(200).send(orderDate);
      } catch (err) {
        next(err);
      }
    } else if (date === "menosReciente") {
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
    try {
      const order = await this.model.findAll({ where: { status } });
      res.status(200).json(order);
    } catch (error) {
      next(error);
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
      delivery,
      local,
    } = req.body;
    let info = delivery === "Envío" ? "en-espera" : "retiro";
    console.log("delivery", delivery);
    try {
      const ordenCreada = await this.model.create({
        email,
        price,
        address,
        phone,
        contactName,
        contactSurname,
        info: info,
        local: req.body.store,
        //date: Date().slice(0, 10).replace(/-/g, "/"),
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

      if (req.body.store && req.body.date && req.body.hour) {
        const turn = await Turn.findOne({
          where: {
            store: req.body.store,
            date: req.body.date,
            hour: req.body.hour,
          },
        });
        ordenCreada.setTurn(turn.dataValues.id);
        await turn.increment({
          full: +1,
        });
        turn.save();
      }
      res.json(ordenCreada);
    } catch (error) {
      next(error);
    }
  };
  setOrderStatus = async (req, res, next) => {
    const { status } = req.body;
    const { orderid } = req.params;
    try {
      const orden = await this.model.findByPk(orderid, { include: Product });
      orden.update(
        {
          status: status,
        },
        {
          where: {
            id: orderid,
          },
        }
      );
      res.status(200).send(orden);
    } catch (err) {
      next(err);
    }
  };
  filterByDelivery = async (req, res, next) => {
    try {
      let orden = await this.model.findAll();
      orden = orden.filter((c) => c.info !== "retiro");
      res.status(200).send(orden);
    } catch (err) {
      next(err);
    }
  };
  sendDelivery = async (req, res, next) => {
    const { id } = req.params;
    try {
      const orden = await this.model.findByPk(id);
      if (orden === null) {
        return res.status(400).send({ message: "No existe la orden" });
      }
      orden.info = "en-camino";
      orden.save();
      let template = getTemplateEnCamino(orden.contactName);
      await sendEmail(orden.email, "Envio en camino", template);
      res.status(200).json({ message: "Orden en camino" });
    } catch (err) {
      next(err);
    }
  };
  allOrders = async (req, res, next) => {
    try {
      const order = await this.model.findAll({
        include: Product,
      });
      res.status(200).send(order);
    } catch (err) {
      next(err);
    }
  };
  getOrderDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
      const ordenDetail = await this.model.findByPk(id, { include: Product });
      res.send(ordenDetail).status(200);
    } catch (error) {
      next(error);
    }
  };
  getUserOrder = async (req, res, next) => {
    const { username } = req.params;
    try {
      const ordenDetail = await this.model.findAll({ include: Product });
      const ordenes = ordenDetail.filter((c) =>
        c.userUsername.toLowerCase().includes(username.toLowerCase())
      );
      if (ordenes.length < 1) {
        return res.json({ message: "No existen ordenes con este usuario" });
      }
      res.send(ordenes);
    } catch (error) {
      next(error);
    }
  };
  setOrderEntregada = async (req, res, next) => {
    const { orderId } = req.params;
    try {
      const order = await this.model.findByPk(orderId);
      order.update({
        status: "finalizada",
        info: "entregada",
      });
      order.save();
      res.send("Orden seteada a entregada");
    } catch (error) {
      next(error);
    }
  };
}

const OrderControllers = new OrderModel(Order);

module.exports = OrderControllers;
