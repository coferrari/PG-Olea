const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const brandControllers = require("../controllers/brand");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", brandControllers.getAll);
router.get("/:id", brandControllers.getByID);
router.post("/", brandControllers.create);
router.put("/:id", brandControllers.update);
router.delete("/:id", brandControllers.delete);

module.exports = router;
