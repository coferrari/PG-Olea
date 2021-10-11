const { Router } = require("express");
const router = Router();
const validate = require("../utils/middlewares/validateSchemaModel");
const userFunction = require("../controllers/user");
const schema = require("../utils/schemas/user.joi");
const verifyToken = require("../utils/middlewares/validateToken");
const {
  checkDuplicate,
  checkEmailAndPassword,
  checkEmail,
} = require("../utils/middlewares/checkDuplicate");
const isAdmin = require("../utils/middlewares/isAdmin");
const adminFunction = require("../controllers/admin");
router.get("/", userFunction.getAll);
router.post("/register", checkDuplicate, userFunction.register);
router.post("/login", checkEmailAndPassword, userFunction.login);
router.put("/", verifyToken, userFunction.changePassword);
router.put("/changepassword", checkEmail, userFunction.changePassword);
router.post("/googlelogin", userFunction.googleLogin);
router.post("/confirmregister", userFunction.confirmRegister);
router.post(
  "/requestchangepassword",
  checkEmail,
  userFunction.requestChangePassword
);
router.put("/updateprofile", userFunction.updateProfile);
// router.post("/refresh_token", userFunction.getAccessToken);
router.post("/createadmin", userFunction.createAdmin);
router.post("/changepasswordadmin", isAdmin, adminFunction.changePassword);
router.delete("/deleteuser/:username", isAdmin, adminFunction.deleteUser);
router.put("/generateadmin", isAdmin, adminFunction.generateAdmin);
router.get("/logout", userFunction.logOut);

module.exports = router;
