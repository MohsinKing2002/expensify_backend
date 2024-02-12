import { Router } from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import {
  CreateExpense,
  GetExpenses,
  GetExpensesInRange,
} from "../controllers/expenseController.js";
const router = Router();

router.post("/create", isAuthenticated, CreateExpense);
router.post("/get-expenses", isAuthenticated, GetExpensesInRange);

export default router;
