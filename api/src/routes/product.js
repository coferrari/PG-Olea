const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const productControllers = require("../controllers/product");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", productControllers.getAll);
router.get("/search/:id", productControllers.searchById);
router.get("/orderByPrice/:price", productControllers.orderByPrice);
router.get("/orderByName/:name", productControllers.orderByName);
router.get("/orderByRating/:rating", productControllers.orderByRating);
router.get("/searchby/name", productControllers.searchName);
router.post("/", productControllers.create);
router.post("/add/carrito", productControllers.addProduct);
router.put("/:id", productControllers.update);
router.delete("/:id", productControllers.delete);
router.delete("/delete/carrito", productControllers.deleteProduct);

module.exports = router;
