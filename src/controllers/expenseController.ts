import { Request, Response } from "express";
import { Expense } from "../models";

class ExpenseController {
  async getAllExpense(req: Request, res: Response) {
    try {
      const expense = await Expense.findAll();
      res.status(200).json({ success: true, data: expense });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching document" });
    }
  }

  async postExpense(req: Request, res: Response) {
    try {
      const createExpense = await Expense.create({ ...req.body });
      res.status(200).json({ success: true, data: createExpense });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching document" });
    }
  }
}

export default new ExpenseController();
