const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
})


const checkoutControllers = {}


checkoutControllers.pago = (req, res) => {
    let items = req.body
    let preference = {
        items: items.map(i => {
            return {
                title: i.name,
                unit_price: parseInt(i.price),
                quantity: i.quantity,
            }
        })
    }
    mercadopago.preferences.create(preference)
        .then(function (respuesta) {
            const redireccion = respuesta.body.init_point
            res.send(redireccion)
        }).catch(function (error) {
            (error);
        });

}

module.exports = checkoutControllers;