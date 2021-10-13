const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const marcas = require("./json/marcas.js");
const categoryMockUp = require("./json/categorias");
const productMockUp = require("./json/productos");
const { adminMockUp, userMockUp } = require("./json/admins");
const ordersMockUp = require("./json/ordernes");
const reviewsMockUp = require("./json/review");
const product = require("./src/models/product.js");
const { DB_URL } = process.env;
conn
  .sync({ force: true })
  .then(async () => {
    //Posteo todas las marcas y categorias
    await userMockUp();
    await adminMockUp();
    await categoryMockUp();
    await productMockUp();
    await reviewsMockUp();
    // await ordersMockUp();
    await server.listen(process.env.PORT || 3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  })
  .catch((e) => console.log(e.message));
