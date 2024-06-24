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
router.post("/createCart", authMiddleware, CreateItem);
router.delete("/deleteCart/:id", authMiddleware, DeleteItemfromCart);
router.post("/checkout", authMiddleware, checkoutCart);
export default router;
