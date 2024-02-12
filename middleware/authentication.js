import jwt from "jsonwebtoken";
import { ResponseHandler } from "../utils/index.js";
import { DBUser } from "../models/user.js";

// check if authenticated
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) return ResponseHandler(res, 401, "Unathorized action!");
    const { _id } = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = await DBUser.findOne({ _id });

    next();
  } catch (error) {
    console.log("authentication error ->", error);
  }
};
