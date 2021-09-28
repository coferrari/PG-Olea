const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const userRoutes = require("./user");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/user", userRoutes);

module.exports = router;
