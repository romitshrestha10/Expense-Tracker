import { Request, Response } from "express";
import { Expense, User } from "../models";
import { Sequelize } from "sequelize";

class ExpenseController {
  async getAllExpense(req: Request, res: Response) {
    try {
      const expense = await Expense.findAll({
        include: [User],
      });
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

  async getOneExpense(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const expense = await Expense.findByPk(id);
      res.status(200).json({ success: true, data: expense });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching document" });
    }
  }

  async updateExpense(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await Expense.update(req.body, { where: { id } });
      const getUpdated = await Expense.findByPk(id);
      res.status(200).json({ success: true, data: getUpdated });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching document" });
    }
  }

  async deleteExpense(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await Expense.destroy({ where: { id } });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting" });
    }
  }
  async summaryExpense(req: Request, res: Response) {
    try {
      const summary = await Expense.sum("amount");
      res.status(200).json({ success: true, data: summary });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching data" });
    }
  }

  async summaryByCategory(req: Request, res: Response) {
    try {
      console.log(req.params.category);
      const summary = await Expense.findAll({
        attributes: [
          "category",
          [Sequelize.fn("SUM", Sequelize.col("amount")), "totalAmount"],
        ],
        group: ["category"],
      });
      res.status(200).json({ success: true, data: summary });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching" });
    }
  }
}

export default new ExpenseController();
