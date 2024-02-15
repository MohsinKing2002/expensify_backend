import { Router } from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import {
  CreateExpense,
  DeleteExpense,
  GetExpensesInRange,
  UpdateExpense,
} from "../controllers/expenseController.js";
const router = Router();

router.post("/create", isAuthenticated, CreateExpense);
router.post("/get-expenses", isAuthenticated, GetExpensesInRange);
router.post("/update-expense", isAuthenticated, UpdateExpense);
router.delete("/delete-expense", isAuthenticated, DeleteExpense);

export default router;
