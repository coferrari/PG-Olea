const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// requerimos los modelos de la db
const userRoutes = require("./user");
const productRoutes = require ("./product")
const orderRoutes = require("./order");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);



module.exports = router;
