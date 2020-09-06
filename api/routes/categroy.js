const express = require("express");

const router = express.Router();
const { requiredSignin, isAuth, isAdmin } = require("../controller/auth");

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list
} = require("../controller/category");
const { userById } = require("../controller/user");

router.post(
  "/category/create/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  create
);
router.put(
  "/category/:categoryId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  remove
);

router.get("/categories", list);

router.get("/category/:categoryId", read);
router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
