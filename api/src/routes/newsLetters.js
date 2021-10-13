const { Router } = require("express");
const router = Router();
const newsLetter = require("../controllers/newsLetters");
const isAdmin = require("../utils/middlewares/isAdmin");
router.get("/", newsLetter.getAll);
router.post("/ofertproduct", isAdmin, newsLetter.sendLetterProduct);

module.exports = router;
