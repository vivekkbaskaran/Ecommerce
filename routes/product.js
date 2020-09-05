const express = require("express");

const router = express.Router();
const { requiredSignin, isAuth, isAdmin } = require("../controller/auth");

const {
  create,
  productById,
  read,
  remove,
  update,
  list
} = require("../controller/product");
const { userById } = require("../controller/user");

router.post("/product/create/:userId", requiredSignin, isAuth, isAdmin, create);
router.get("/products", list);
router.delete(
  "/product/:productId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  remove
);

router.delete(
  "/product/:productId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  update
);

router.put(
  "/product/:productId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  update
);
router.get("/product/:productId", read);
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
