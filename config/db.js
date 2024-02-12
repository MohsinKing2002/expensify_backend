import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("db connected");
  } catch (error) {
    console.log("db connect error ->", error);
  }
};
