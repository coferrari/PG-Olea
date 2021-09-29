const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");
const router = Router();
const validate = require("../utils/middlewares/validateSchemaModel");
const userFunction = require("../controllers/user");
const schema = require("../utils/schemas/user.joi");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get("/", userControllers.getAll);
// router.get("/:id", userControllers.getByID);
router.post("/register", validate(schema), userFunction.register);
router.post("/login", userFunction.login);
// router.put("/:id", userControllers.update);
// router.delete("/:id", userControllers.delete);

module.exports = router;
