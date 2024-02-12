import { DBUser } from "../models/user.js";
import {
  HashPasswords,
  ResponseHandler,
  GenerateToken,
  MatchPasswords,
} from "../utils/index.js";

/************************************* login function ***************************************/
export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await DBUser.findOne({ email }).select("+password");
    //if user not found then return
    if (!user) return ResponseHandler(res, 404, "User not found !");

    // match password
    const isPasswordMatched = await MatchPasswords(password, user.password);
    if (!isPasswordMatched)
      return ResponseHandler(res, 404, "Password not matched !");

    const token = GenerateToken(user._id);
    user = { ...user.toObject(), token };

    return ResponseHandler(res, 200, "Logged in", user);
  } catch (error) {
    console.log("login error ->", error);
  }
};

/************************************* register function ***************************************/
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

    user = { ...user.toObject(), token };
    return ResponseHandler(res, 200, "User Created !", user);
  } catch (error) {
    console.log("register error ->", error);
  }
};
