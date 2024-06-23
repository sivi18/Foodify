import { Router } from "express";

const router = Router();
const {
  CreateItem,
  DeleteItemfromCart,
  signupUser,
  loginUser,
} = require("../controller/UserController");
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/createCart", CreateItem);
router.delete("/deleteCart/:id", DeleteItemfromCart);
export default router;
