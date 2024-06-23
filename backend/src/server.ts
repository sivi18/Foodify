import Connection from "../connection/Dbconfig";
import router from "../routes/router";
import { Request, Response } from "express";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my website");
});
const PORT: number = parseInt(process.env.PORT as string, 10) || 7000;

app.listen(PORT, (): void => {
  console.log(`Server Connected to the Port of ${PORT}`);
  Connection();
});
