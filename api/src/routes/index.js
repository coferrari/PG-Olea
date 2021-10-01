const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// requerimos los modelos de la db
const userRoutes = require("./user");
const productRoutes = require("./product");
const orderRoutes = require("./order");
const brandRoutes = require("./brand");
const categoryRoutes = require("./category");
const order_detailRoutes = require("./order_detail");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/brand", brandRoutes);
router.use("/category", categoryRoutes);
router.use("/order_detail", order_detailRoutes);

module.exports = router;
