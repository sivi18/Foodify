import { Request, Response, NextFunction } from "express";
import { CartModel } from "../model/CartModel";
import UserModel, { IUser } from "../model/userModel";
import expressAsyncHandler from "express-async-handler";
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
interface CreateItemRequest extends Request {
  body: {
    id: string;
    mealName: string;
    quantity: number;
    price: number;
    mealThumb: string;
  };
}

const CreateItem = asyncHandler(
  async (req: CreateItemRequest, res: Response, next: NextFunction) => {
    const { id, mealName, quantity, price, mealThumb } = req.body;
    if (!id || !mealName || !quantity || !price || !mealThumb) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      await CartModel.insertMany({
        id: id,
        mealName: mealName,
        quantity: quantity,
        price: price,
        mealThumb: mealThumb,
      });
      res.status(201).json({
        id: id,
        mealName: mealName,
        quantity: quantity,
        price: price,
        mealThumb: mealThumb,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
const DeleteItemfromCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    console.log(req.params);

    console.log(id);

    if (!id) {
      return res.status(400).json({ message: "Id is mandatory" });
    }
    // try {
    //   const response = await CartModel.find({});
    //   console.log(response);

    //   if (!response) {
    //     return res.status(404).json({ message: "Item not found" });
    //   }
    //   res.status(200).json({ message: "Item deleted successfully" });
    // } catch (error) {
    //   return res.status(500).json({ message: "Internal Server Error" });
    // }
  }
);

const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: IUser = new UserModel({
    email,
    password: hashedPassword,
    username,
  });

  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful" });
});
module.exports = { CreateItem, DeleteItemfromCart, loginUser, signupUser };
