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
    console.log(preference)
    mercadopago.preferences.create(preference)
        .then(function (respuesta) {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            //   global.id = response.body.id;
            const redireccion = respuesta.body.init_point
            console.log(redireccion)
            res.send(redireccion)
        }).catch(function (error) {
            console.log(error);
        });

}

module.exports = checkoutControllers;