const express = require("express");

const router = express.Router();

const { requiredSignin, isAuth, isAdmin } = require("../controller/auth");

const { userById, read, update } = require("../controller/user");

router.get("/secret/:userId", requiredSignin, isAuth, isAdmin, (req, res) => {
  console.log(req.profile);
  res.json({
    user: req.profile
  });
});

router.get("/user/:userId", requiredSignin, isAuth, isAdmin, read);

router.put("/user/:userId", requiredSignin, isAuth, isAdmin, update);
router.param("userId", userById);

module.exports = router;
