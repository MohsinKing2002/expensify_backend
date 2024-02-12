import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const ResponseHandler = (res, status = "", message = "", data = {}) => {
  return res.json({ status, message, data });
};

export const ErrorHandler = (
  res,
  status = 500,
  message = "Internal Server Error"
) => {
  return res.json({ status, message });
};

export const HashPasswords = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const GenerateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY);
};
