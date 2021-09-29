const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const OrderControllers = require("../controllers/Order");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/:id", OrderControllers.getByID);
router.post("/", OrderControllers.create);
router.put("/:id", OrderControllers.update);
router.delete("/:id", OrderControllers.delete);
router.get("/orderbystatus", OrderControllers.orderByStatus);
router.get("/orderbydate", OrderControllers.orderByDate);
router.get("/filterbystatus", OrderControllers.filterByStatus);

module.exports = router;
