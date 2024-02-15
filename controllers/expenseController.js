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

/************************************* update expense ***************************************/
export const UpdateExpense = async (req, res, next) => {
  try {
    const { expense_id, amount, category, time } = req.body;

    const expense = await DBExpense.findOne({ _id: expense_id });
    if (!expense) return ResponseHandler(res, 404, "Expense not found.");
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (time) expense.time = time;

    await expense.save();

    ResponseHandler(res, 200, "Updated expense", expense);
  } catch (error) {
    console.log("update expense error ->", error);
  }
};

/************************************* delete expense ***************************************/
export const DeleteExpense = async (req, res, next) => {
  try {
    const { expense_id } = req.body;

    const expense = await DBExpense.findOne({ _id: expense_id });
    if (!expense) return ResponseHandler(res, 404, "Expense not found.");

    //delte the specific entry
    await DBExpense.deleteOne({ _id: expense_id });

    //remove from user's exepnse array
    const user = req.user;
    await DBUser.updateOne(
      { _id: user._id },
      { $pull: { expenses: expense_id } }
    );

    ResponseHandler(res, 200, "deleted expense");
  } catch (error) {
    console.log("delete expense error ->", error);
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
