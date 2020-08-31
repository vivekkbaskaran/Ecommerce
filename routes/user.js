const express = require("express");

const router = express.Router();

const { requiredSignin, isAuth, isAdmin } = require("../controller/auth");

const { userById } = require("../controller/user");

router.get("/secret/:userId", requiredSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

router.param("userId", userById);

module.exports = router;
