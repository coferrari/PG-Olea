const { Router } = require("express");

const router = Router();
const newsLetter = require("../controllers/newsLetters");
const isAdmin = require("../utils/middlewares/isAdmin");
const verifyToken = require("../utils/middlewares/validateToken");
router.get("/", newsLetter.getAll);
router.post("/ofertproduct", isAdmin, newsLetter.sendLetterProduct);
router.post("/ofertcategory", isAdmin, newsLetter.sendCategoryLetter);
router.post("/suscribe", verifyToken, newsLetter.suscribeNewsLetter);
router.put("/desuscribe", newsLetter.desuscribeNewsLetter);
module.exports = router;
