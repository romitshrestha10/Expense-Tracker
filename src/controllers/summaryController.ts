import { Request, Response } from "express";
import { Expense, Summary, User } from "../models";
import { Sequelize } from "sequelize";

class SummaryController {
  async getAllSummary(req: Request, res: Response) {
    try {
      const summary = await Summary.findAll();
      res.status(200).json({ success: true, data: summary });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching summary" });
    }
  }

  async postSummary(req: Request, res: Response) {
    try {
      const createSummary = await Summary.create({ ...req.body });
      res.status(200).json({ success: true, data: createSummary });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error adding summary" });
    }
  }

   async calculate(req: Request, res: Response) {
    try {
      const cycleId = req.params.cycleId

    const totalExpenses = await Expense.sum("amount",{
      where:
      {
        cycleId: cycleId
      }
    })
    const userCount = await User.count()
    const individualDistribution = totalExpenses/userCount;
   const summary = await Expense.findAll({
        attributes: [
          "userId",
          [Sequelize.fn("SUM", Sequelize.col("amount")), "totalAmount"],
        ],
        group: ["userId"],
      });

         const finalSummary = summary.map((item: any) => {
      const userExpense = Number(item.get("totalAmount"));

      const pendingAmount =
        individualDistribution - userExpense;

      return {
        userId: item.userId,
        userExpense,
        individualDistribution,
        pendingAmount,
      };
    });

    res.status(200).json({
      success: true,
      totalExpenses,
      userCount,
      data: finalSummary,
    });
        

      

    } catch (error) {
      res.status(500).json({ success: false, message: "Error loading summary" });
    }
  }
}

export default new SummaryController();
