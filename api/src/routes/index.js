const { Router } = require("express");
const cors = require("cors");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
router.use(cors());
// requerimos los modelos de la db
const userRoutes = require("./user");
const productRoutes = require("./product");
const orderRoutes = require("./order");
const brandRoutes = require("./brand");
const categoryRoutes = require("./category");
const carritodetailRoutes = require("./carrito");
const checkoutRoutes = require("./checkout");
const reviewsRoutes = require("./reviews");
const storesRoutes = require("./stores");
const wishlistRouter = require("./wishlist");
const newsLettersRoutes = require("./newsLetters");
const turnRoutes = require ("./turn");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/brand", brandRoutes);
router.use("/category", categoryRoutes);
router.use("/carrito", carritodetailRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/reviews", reviewsRoutes);

router.use("/stores", storesRoutes);

router.use("/wishlist", wishlistRouter);
router.use("/news", newsLettersRoutes);
router.use("/turn", turnRoutes);



module.exports = router;
