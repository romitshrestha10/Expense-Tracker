import { Router } from "express";
import ExpenseController from "../controllers/expenseController";

const router = Router();

router.get("/", ExpenseController.getAllExpense);
router.post("/", ExpenseController.postExpense);

export default router;
