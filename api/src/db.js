require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { dbUser, dbPassword, dbHost, dbName } = require("./utils/config");

const sequelize = dbPassword
  ? new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`, {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    })
  : new Sequelize(`postgres://${dbUser}@${dbHost}/${dbName}`, {
      logging: false,
      native: false,
    });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Brand, Category, Order, Product, User, Carrito, Carrito_Products } =
  sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Order);
Order.belongsTo(User);
//
User.hasOne(Carrito);
Carrito.belongsTo(User);
//
Brand.hasMany(Product);
Product.belongsTo(Brand);

//
Carrito.belongsToMany(Product, {
  through: Carrito_Products,
});
Product.belongsToMany(Carrito, {
  through: Carrito_Products,
});
//
Order.belongsToMany(Product, { through: Order_Product });
Product.belongsToMany(Order, { through: Order_Product });
//

Category.belongsToMany(Product, { through: "Product_Category" });
Product.belongsToMany(Category, { through: "Product_Category" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
