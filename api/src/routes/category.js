const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const categoryControllers = require("../controllers/category");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", categoryControllers.getAll);
router.get("/:id", categoryControllers.getByID);
router.post("/", categoryControllers.create);
router.put("/:id", categoryControllers.update);
router.delete("/:id", categoryControllers.delete);

module.exports = router;
