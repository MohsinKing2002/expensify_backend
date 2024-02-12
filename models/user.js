import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    expenses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "DBExpense",
      },
    ],
  },
  { timestamps: true }
);

export const DBUser = mongoose.model("DBUser", schema);
