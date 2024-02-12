import { DBUser } from "../models/user.js";
import {
  HashPasswords,
  ResponseHandler,
  GenerateToken,
} from "../utils/index.js";

/************************************* login function ***************************************/
export const LoginUser = async (req, res, next) => {
  try {
    // const {email, }
  } catch (error) {
    console.log("login error ->", error);
  }
};

/************************************* login function ***************************************/
export const RegisterUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //check if the user already exists
    const isExists = await DBUser.findOne({ email });
    if (isExists) return ResponseHandler(res, 404, "Email already exists!");
    let hashedPass = await HashPasswords(password);

    let user = await DBUser.create({ name, email, password: hashedPass });
    if (!user) return ResponseHandler(res, 400, "Failed to create user");
    let token = GenerateToken(user._id);

    user = { ...user, token };
    return ResponseHandler(res, 200, "User Created !", user);
  } catch (error) {
    console.log("login error ->", error);
  }
};

/************************************* login function ***************************************/
export const name = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("login error ->", error);
  }
};
