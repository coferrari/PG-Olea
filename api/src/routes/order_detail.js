const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const orderDetailControllers = require("../controllers/order_detail");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", orderDetailControllers.getAll);
router.get("/:id", orderDetailControllers.getByID);
router.post("/", orderDetailControllers.create);
router.put("/:id", orderDetailControllers.update);
router.delete("/:id", orderDetailControllers.delete);

module.exports = router;
