import { Request, Response } from "express";
import { Expense, User } from "../models";
import { Op, Sequelize } from "sequelize";
import { Operation } from "../middleware/practiseMiddleware";
import Calculator from "../middleware/practiseMiddleware";
import { sharedExpense } from "../models/sharedExpenses";
import connection from "../db/db";

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
      const transaction = await connection.transaction(); // Ensure atomicity

      const createExpense = await Expense.create(
        { ...req.body },
        { transaction }
      );
      if (createExpense.isShared === true) {
        if (!req.body.participants || req.body.participants.length === 0) {
          await transaction.rollback();
          return res
            .status(400)
            .json({ error: "Participants are required for shared expenses." });
        }

        const sharedData = req.body.participants.map(
          (participantId: number) => ({
            shareAmount: req.body.amount / req.body.participants.length,
            expenseId: createExpense.id,
            userId: participantId,
          })
        );
        await sharedExpense.bulkCreate(sharedData, { transaction });
      }

      await transaction.commit();

      res.status(200).json({ success: true, data: createExpense });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating" });
    }
  }

  async settleExpense(req: Request, res: Response) {
    try {
      const { expenseId } = req.body;
      const userId = req.user?.id;

      if (!expenseId) {
        res
          .status(404)
          .json({ success: false, message: "Couldnot fin the expense" });
      }

      const expense = await Expense.findByPk(expenseId);
      if (expense?.userId !== userId) {
        return res.status(403).json({
          error: "Only the expense owner can settle this expense.",
        });
      }

      await expense?.update({
        isSettled: true,
      });
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
      const summary = await Expense.findAll({
        attributes: [
          "category",
          [Sequelize.fn("SUM", Sequelize.col("amount")), "totalAmount"],
        ],
        group: ["category"],
      });
      // const a = userExpenses(1);
      res.status(200).json({ success: true, data: summary });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching" });
    }
  }

  async updateRecurringExpense(req: Request, res: Response) {
    try {
      const recurringExpenses = await Expense.findAll({
        where: {
          type: "recurring",
          nextDueDate: { [Op.lte]: new Date() },
        },
      });

      for (const expense of recurringExpenses) {
        await expense.update({ status: "completed" });

        let newNextDueDate = new Date(expense.nextDueDate);

        if (expense.frequency === "monthly") {
          newNextDueDate.setMonth(newNextDueDate.getMonth() + 1);
        }

        if (expense.frequency === "weekly") {
          newNextDueDate.setDate(newNextDueDate.getDate() + 7);
        }

        if (expense.frequency === "daily") {
          newNextDueDate.setDate(newNextDueDate.getDate() + 1);
        }

        await Expense.create({
          userId: expense.userId,
          amount: expense.amount,
          category: expense.category,
          type: "recurring",
          frequency: expense.frequency,
          startDate: expense.startDate,
          nextDueDate: newNextDueDate, // New calculated date
          status: "active",
        });
      }

      res.json({ message: "Recurring expenses updated successfully" });
    } catch (error) {
      console.error("Error updating recurring expenses:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async practise(req: Request, res: Response) {
    try {
      const calcu = new Calculator();
      const operation: Operation = "subtract";
      const result = calcu[operation](4, 2);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching" });
    }
  }
}

export default new ExpenseController();
