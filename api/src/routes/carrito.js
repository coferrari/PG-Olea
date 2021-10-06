const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const carritoControllers = require("../controllers/carrito");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", carritoControllers.getAll);
router.get("/:carritoId", carritoControllers.getByID);
router.post("/", carritoControllers.create);
router.put("/:id", carritoControllers.update);
router.delete("/:id", carritoControllers.delete);
router.delete("/carrito/emptycart", carritoControllers.emptyCart);

module.exports = router;
