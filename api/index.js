//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const marcas = require("./json/marcas.js");
const categorias = require("./json/categorias");
const productos = require("./json/productos");
const admin = require("./json/admins");
const axios = require("axios");
const { User } = require("./src/db");
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  //Posteo todas las marcas y categorias
  // for (let i = 0; i < marcas.length; i++) {
  //   const post = axios.post("http://localhost:3001/api/brand", marcas[i]);
  //   post.then();
  // }
  for (let i = 0; i < categorias.length; i++) {
    const post = axios.post(
      "http://localhost:3001/api/category",
      categorias[i]
    );
    post.then();
  }
  // for (let j = 0; j < 5; j++) {
  //   for (let i = 0; i < productos.length; i++) {
  //     const post = axios.post(
  //       "http://localhost:3001/api/product",
  //       productos[i]
  //     );
  //     post.then();
  //   }
  // }
  for (let i = 0; i < admin.length; i++) {
    const post = axios.post(
      "http://localhost:3001/api/user/createadmin",
      admin[i]
    );
    post.then();
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
