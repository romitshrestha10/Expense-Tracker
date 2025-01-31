import { Router } from "express";
import ExpenseController from "../controllers/expenseController";

const router = Router();
router.post("/", ExpenseController.postExpense);

router.get("/", ExpenseController.getAllExpense);
router.get("/summary", ExpenseController.summaryExpense);
router.get("/scategory/", ExpenseController.summaryByCategory);
router.get("/practise", ExpenseController.practise);

router.get("/:id", ExpenseController.getOneExpense);
router.put("/updateRecurring", ExpenseController.updateRecurringExpense);
router.put("/:id", ExpenseController.updateExpense);

router.delete("/", ExpenseController.deleteExpense);

export default router;
