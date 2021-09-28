const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");

const userFunction = require("../controllers/user");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get("/", userControllers.getAll);
// router.get("/:id", userControllers.getByID);
router.post("/signup", userFunction.signUp);
// router.put("/:id", userControllers.update);
// router.delete("/:id", userControllers.delete);

module.exports = router;
