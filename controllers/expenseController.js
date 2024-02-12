import { DBExpense } from "../models/expense.js";
import { DBUser } from "../models/user.js";
import { ResponseHandler } from "../utils/index.js";

/************************************* create expense ***************************************/
export const CreateExpense = async (req, res, next) => {
  try {
    const { amount, category, time } = req.body;
    const { _id } = req.user;
    const expense = await DBExpense.create({
      amount,
      category,
      time,
      user: _id,
    });

    if (!expense) return ResponseHandler(res, 400, "Failed to create expense");
    //also save it to user doc
    await DBUser.updateOne({ _id }, { $push: { expenses: expense } });

    return ResponseHandler(res, 200, "Expenses Created", expense);
  } catch (error) {
    console.log("create expense error ->", error);
  }
};

/************************************* create expense ***************************************/
export const GetExpenses = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const expenses = await DBExpense.find({ user: _id });

    return ResponseHandler(res, 200, "Fetched expenses", expenses);
  } catch (error) {
    console.log("get expense error ->", error);
  }
};

/************************************* get expenses ***************************************/
export const GetExpensesInRange = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const { _id } = req.user;
    const expenses = await DBExpense.find({
      user: _id,
      time: { $gte: from, $lte: to },
    });

    return ResponseHandler(res, 200, "Fetched expenses", expenses);
  } catch (error) {
    console.log("get expenses error ->", error);
  }
};
