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
const carritodetailRoutes = require("./carrito");
const checkoutRoutes = require("./checkout");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/brand", brandRoutes);
router.use("/category", categoryRoutes);
router.use("/carrito", carritodetailRoutes);
router.use("/checkout",checkoutRoutes)

module.exports = router;
