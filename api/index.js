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

// Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
  //Posteo todas las marcas y categorias
//   for (let i = 0; i < categorias.length; i++) {
//     const post = axios.post(
//       `http://localhost:3001/api/category/`,
//       categorias[i]
//     );
//     post.then();
//   }
//   for (let j = 0; j < 5; j++) {
//     for (let i = 0; i < productos.length; i++) {
//       const post = axios.post(
//         `http://localhost:3001/api/product/create/`,
//         productos[i]
//       );
//       post.then();
//     }
//   }
//   for (let i = 0; i < admin.length; i++) {
//     const post = axios.post(
//       `http://localhost:3001/api/user/createadmin/`,
//       admin[i]
//     );
//     post.then();
//   }
//   server.listen(process.env.PORT || 3001, () => {
//     console.log("%s listening at 3001"); // eslint-disable-line no-console
//   });
// });

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

