const express = require("express");

const router = express.Router();

const {
  signUp,
  signin,
  signOut,
  requiredSignin
} = require("../controller/auth");
const { userSignupValidators } = require("../validator/index");

router.post("/signUp", userSignupValidators, signUp);
router.post("/signin", signin);
router.get("/signOut", signOut);
router.get("/me", requiredSignin, (req, res) => {
  res.send("hello me");
});

module.exports = router;
