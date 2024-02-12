import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: new Date(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "DBUser",
    },
  },
  {
    timestamps: true,
  }
);

export const DBExpense = new mongoose.model("DBExpense", expenseSchema);
