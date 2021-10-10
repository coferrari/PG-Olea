const { Router } = require("express");
const router = Router();
const checkoutControllers = require("../controllers/checkout");


router.post("/mercadopago",checkoutControllers.pago)

module.exports = router;
