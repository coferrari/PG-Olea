const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const checkoutControllers = {};

checkoutControllers.pago = (req, res) => {
  let itemsCheckout = req.body[0];
  let idOrden = req.body[1];
  let preference = {
    items: itemsCheckout.map((i) => {
      return {
        title: i.name,
        unit_price: parseInt(i.price),
        quantity: i.quantity,
      };
    }),
    back_urls: {
      success: "http://localhost:3000/checkoutconfirm",
      failure: "http://localhost:3000/checkoutconfirm",
      pending: "http://localhost:3000/checkoutconfirm",
    },
    auto_return: "approved",
    external_reference: idOrden.toString(),
  };
  mercadopago.preferences
    .create(preference)
    .then(function (respuesta) {
      const redireccion = respuesta.body.init_point;
      res.send(redireccion);
    })
    .catch(function (error) {
      error;
    });
};

module.exports = checkoutControllers;
