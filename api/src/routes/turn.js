const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');const { Router } = require("express");
const isAdmin = require("../utils/middlewares/isAdmin");
const turnControllers = require("../controllers/turns");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/getAll", turnControllers.getAll);
router.post("/", turnControllers.create);
router.delete("/deleteturn/:id", turnControllers.delete);
router.get("/getTurnByUser/:username", turnControllers.getTurnByUser);
router.delete("/cancelturn", turnControllers.cancelTurn);
router.get("/getAvailableTurns", turnControllers.getAvailableTurns);

module.exports = router;
