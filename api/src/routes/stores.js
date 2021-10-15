const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const storesControllers = require("../controllers/stores");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", storesControllers.getAll);
router.post("/", storesControllers.create);
router.delete("/:id", storesControllers.delete);

module.exports = router;
