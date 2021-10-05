const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const categoryControllers = require("../controllers/category");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", categoryControllers.getAll);
router.get("/:category", categoryControllers.filterByCategory);
router.post("/", categoryControllers.create);
router.put("/:id", categoryControllers.update);
router.delete("/:id", categoryControllers.delete);
router.post("/addCategories", categoryControllers.addCategories);
// router.get("/:category", categoryControllers.filterByCategory);

module.exports = router;
