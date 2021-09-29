const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const userRoutes = require("./user");
const orderRoutes = require("./order");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);

module.exports = router;
