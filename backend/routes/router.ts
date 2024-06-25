import { Router } from "express";
import authMiddleware from "../middlewares/AuthMiddleware";
const router = Router();
const {
  CreateItem,
  DeleteItemfromCart,
} = require("../controller/UserController");
const { checkoutCart } = require("../controller/CartCheckout");
const { signupUser, loginUser } = require("../controller/LoginController");
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/createCart", CreateItem);
router.delete("/deleteCart/:id", DeleteItemfromCart);
router.post("/checkout", checkoutCart);
export default router;
