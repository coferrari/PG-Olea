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
const adminFunction = require("../controllers/admin");
router.get("/", isAdmin, userFunction.getAll);
router.post("/register", checkDuplicate, userFunction.register);
router.post("/login", checkEmailAndPassword, userFunction.login);
router.put("/", verifyToken, userFunction.changePassword);
router.put("/changepassword", userFunction.changePassword);
router.post("/googlelogin", userFunction.googleLogin);
router.post("/confirmregister", userFunction.confirmRegister);
router.post("/requestchangepassword", userFunction.requestChangePassword);
router.post("/createadmin", userFunction.createAdmin);
router.post("/changepasswordadmin", isAdmin, adminFunction.changePassword);
router.delete("/deleteuser/:username", adminFunction.deleteUser);
module.exports = router;
