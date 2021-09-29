const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const productControllers = require("../controllers/product");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", productControllers.getAll);
router.get("/:id", productControllers.getByID);
router.get("/orderByPrice/:price", productControllers.orderByPrice)
router.get("/orderByName/:name", productControllers.orderByName)
router.get("/orderByRating/:rating", productControllers.orderByRating)
router.post("/", productControllers.create);
router.put("/:id", productControllers.update);
router.delete("/:id", productControllers.delete);

module.exports = router;