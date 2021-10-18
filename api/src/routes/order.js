const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const OrderControllers = require("../controllers/order");
const isAdmin = require("../utils/middlewares/isAdmin");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.get("/:id", OrderControllers.getByID);
// router.post("/", OrderControllers.create);
router.put("/:id", OrderControllers.update);
router.delete("/:id", OrderControllers.delete);
router.get("/orderbystatus/:status", OrderControllers.orderByStatus);
router.get("/date/:date", OrderControllers.orderByDate);
router.get("/filterbystatus/:status", OrderControllers.filterByStatus);
router.post("/createOrder", OrderControllers.createOrder);
router.put("/setorder/status/:orderid", OrderControllers.setOrderStatus);
router.get("/findAll/orders", isAdmin, OrderControllers.allOrders);
router.get("/getorderdetails/:id", OrderControllers.getOrderDetails);
router.get("/getuserorder/:username", OrderControllers.getUserOrder);
router.get("/filterdelivery", OrderControllers.filterByDelivery);
router.put("/changedelivery/:id", OrderControllers.sendDelivery);
router.put("/change/:id", OrderControllers.changeStatus);
router.put("/setOrderEntregada/:orderId", OrderControllers.setOrderEntregada);
module.exports = router;
