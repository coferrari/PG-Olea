const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const marcas = require("./json/marcas.js");
const categoryMockUp = require("./json/categorias");
const productMockUp = require("./json/productos");
const { adminMockUp } = require("./json/admins");
const { User } = require("./src/db");
const product = require("./src/models/product.js");
const { DB_URL } = process.env;
// Syncing all the models at once.

conn
  .sync({ force: true })
  .then(async () => {
    //Posteo todas las marcas y categorias
    await categoryMockUp();
    await productMockUp();
    await adminMockUp();
    await server.listen(process.env.PORT || 3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  })
  .catch((e) => console.log(e.message));
