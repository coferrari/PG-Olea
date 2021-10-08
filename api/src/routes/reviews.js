const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const reviewsControllers = require("../controllers/reviews");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", reviewsControllers.getAll);
router.post("/", reviewsControllers.create);
router.put("/:id", reviewsControllers.update);
router.delete("/:id", isAdmin, reviewsControllers.delete);
router.get("/:id", reviewsControllers.getByProduct);
module.exports = router;
