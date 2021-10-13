const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");
const isAdmin = require("../utils/middlewares/isAdmin");
const categoryControllers = require("../controllers/category");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", categoryControllers.getAll);
router.get("/:category", categoryControllers.filterByCategory);
router.post("/", isAdmin, categoryControllers.create);
router.put("/:id", isAdmin, categoryControllers.updateName);
router.delete("/:id", isAdmin, categoryControllers.delete);
router.post("/addCategories", isAdmin, categoryControllers.addCategories);
router.post(
  "/product/addCategories",
  isAdmin,
  categoryControllers.addCategories
);
router.delete(
  "/product/deleteCategory",
  isAdmin,
  categoryControllers.deleteCategories
);

// router.get("/:category", categoryControllers.filterByCategory);

module.exports = router;
