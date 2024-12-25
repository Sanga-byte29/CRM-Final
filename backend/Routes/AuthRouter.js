const {
  signup,
  login,
  forgotPassword,
} = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
  forgotpassValidation,
} = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/forgotpassword", forgotpassValidation, forgotPassword);

module.exports = router;
