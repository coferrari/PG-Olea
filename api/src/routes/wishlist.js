const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const wishlistControllers = require("../controllers/wishlist");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", wishlistControllers.getWishlist);
router.post("/add", wishlistControllers.addProductToWishlist);
router.delete("/delete", wishlistControllers.removeProductToWishlist);

module.exports = router;