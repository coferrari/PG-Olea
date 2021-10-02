const { Router } = require("express");
const router = Router();
const validate = require("../utils/middlewares/validateSchemaModel");
const userFunction = require("../controllers/user");
const schema = require("../utils/schemas/user.joi");
const verifyToken = require("../utils/middlewares/validateToken");
const {
  checkDuplicate,
  checkEmailAndPassword,
} = require("../utils/middlewares/checkDuplicate");
const isAdmin = require("../utils/middlewares/isAdmin");
router.get("/", isAdmin, userFunction.getAll);
router.post("/register", checkDuplicate, userFunction.register);
router.post("/login", checkEmailAndPassword, userFunction.login);
router.put("/", verifyToken, userFunction.changePassword);
router.put("/changepassword", userFunction.changePassword);
router.post("/googlelogin", userFunction.googleLogin);
router.post("/confirmregister", userFunction.confirmRegister);
router.post("/requestchangepassword", userFunction.requestChangePassword);
router.post("/createadmin", userFunction.createAdmin);
module.exports = router;
