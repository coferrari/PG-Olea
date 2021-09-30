const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");
const router = Router();
const validate = require("../utils/middlewares/validateSchemaModel");
const userFunction = require("../controllers/user");
const schema = require("../utils/schemas/user.joi");
const verifyToken = require("../utils/middlewares/validateToken");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", verifyToken, userFunction.getAll);
// router.get("/:id", userControllers.getByID);
router.post("/register", userFunction.register);
router.post("/login", userFunction.login);
router.put("/", verifyToken, userFunction.changePassword);
router.post("/googlelogin", userFunction.googleLogin);
// router.delete("/:id", userControllers.delete);

module.exports = router;
