const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const OrderControllers = require("../controllers/order");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.get("/:id", OrderControllers.getByID);
// router.post("/", OrderControllers.create);
router.put("/:id", OrderControllers.update);
router.delete("/:id", OrderControllers.delete);
router.get("/orderbystatus/:status", OrderControllers.orderByStatus);
//router.get("/", OrderControllers.getAll);
router.get("/date/:date", OrderControllers.orderByDate);
router.get("/filterbystatus/:status", OrderControllers.filterByStatus);
router.post("/createOrder", OrderControllers.createOrder);
router.get("/setorder/status", OrderControllers.setOrderStatus);
router.get("/findAll/orders", OrderControllers.allOrders);
router.get("/getorderdetails/:id", OrderControllers.getOrderDetails);
router.get("/getuserorder", OrderControllers.getUserOrder);
router.put("/change/:id", OrderControllers.changeStatus);

module.exports = router;
