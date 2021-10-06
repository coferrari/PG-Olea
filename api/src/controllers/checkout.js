const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
})


const checkoutControllers = {}


checkoutControllers.pago = (req, res) => {
    let items = req.body
   
    //const compra = req.body - por body nos llegaría un array de objetos con los productos
    //  let preference = { //esto es de prueba, esto es un objeto con una propiedad item que es un array de objeto con propiedades title, unitprice y quantity
    let preference = {
        items: items.map(i => {
            return {
                title: i.name,
                unit_price: parseInt(i.price),
                quantity: i.quantity,
            }
        })
    }
    // let preference = {
    //     items: [
    //         {
    //           title: 'Dulce de leche',
    //           unit_price: 100,
    //           quantity: 1,
    //         }
    //       ]
    //  }

     console.log(preference)
    mercadopago.preferences.create(preference)
        .then(function (respuesta) {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            //   global.id = response.body.id;
            console.log(respuesta.body.init_point)
            res.send(respuesta)
        }).catch(function (error) {
            console.log(error);
        });

}

module.exports = checkoutControllers;