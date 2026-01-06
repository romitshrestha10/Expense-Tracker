import { Request, Response } from "express";
import { Cycle, Expense, User } from "../models";
import dayjs from "dayjs"
import { currentCycleId } from "../utils/currentDate";
import { Sequelize } from "sequelize";

class CycleController {
    async getAllCycle(req: Request, res: Response) {
        try {
            const cycle = await Cycle.findAll();
            res.status(200).json({ success: true, data: cycle });
        } catch (error) {
            res
                .status(500)
                .json({ success: false, message: "Error fetching cycle" });
        }
    }

    async summaryCycle(req: Request, res: Response) {
        try {
            const cycleId = await currentCycleId()
            // res.status(200).json({ success: true, data: cycleId });
            
            const rows = await Expense.findAll({
                attributes: [
                    "userId",
                    "category",
                    [Sequelize.fn("SUM", Sequelize.col("amount")), "totalAmount"],
                ],
                where: { cycleId: cycleId },
                include: [{ model: User, as: "user", attributes: ["name"] }],
                group: ["userId", "category", "User.id", "User.name"], // important for MySQL strict/grouping
                raw: true,
                nest: true,
            });

            // Arrange: [{ userId, userName, expenses: [{ category, totalAmount }] }]
            const arranged = Object.values(
                rows.reduce((acc: any, r: any) => {
                    const userId = r.userId;
                    const userName = r.user?.name ?? "Unknown";
                    const category = r.category;
                    const totalAmount = Number(r.totalAmount);

                    if (!acc[userId]) {
                        acc[userId] = { userId, userName, expenses: [] as any[] };
                    }

                    acc[userId].expenses.push({ category, totalAmount });
                    return acc;
                }, {})
            );
            // console.log("SAMPLE ROW:", summary[0]);

            res.status(200).json({ success: true, cycleId: 1, data: arranged });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching" });
        }
    }


    async summaryUsers(req: Request, res: Response) {
        try {
            const cycleId = await currentCycleId()

            const summary = await Expense.findAll({
                attributes: [
                    "userId",
                    [Sequelize.fn("SUM", Sequelize.col("amount")), "totalAmount"],
                ],
                where: { cycleId: cycleId },
                include: [{ model: User, as: "user", attributes: ["name"] }],
                group: ["userId", "amount", "name"], // important for MySQL strict/grouping

            });
            res.status(200).json({ success: true, data: summary });
        } catch (error) {
            res
                .status(500)
                .json({ success: false, message: "Error fetching data" });
        }
    }

    async postCycle(req: Request, res: Response) {
        try {
            const startDate = req.body.startDate
            const frequency = req.body.frequency
            // console.log(frequency)
            // const endDate = startDate.setDate(startDate.getDate()+frequency)

            const endDate = dayjs(startDate).add(frequency, "day").format("YYYY-MM-DD");

            // console.log(endDate);

            const createCycle = await Cycle.create({
                ...req.body,
                "endDate": endDate,
                "nextStartDate": dayjs(endDate).add(1, "day").format("YYYY-MM-DD")
            });

            if (req.body.recurringExpense) {
                // console.log(req.user?.id)
                const createExpense = await Expense.create({
                    "amount": req.body.recurringExpenseAmount,
                    "description": req.body.recurringExpense,
                    "category": req.body.recurringExpense,
                    "frequency": req.body.frequency,
                    "isShared": "true",
                    "isSettled": "true",
                    "type": "recurring",
                    "cycleId": createCycle.id,
                    "userId": req.user?.id
                })
                res.status(200).json({ success: true, data: createCycle });
                //   res.status(200).json({ success: true, data: createExpense });

            }
            else {
                //    createCycle.nextStartDate = createCycle.endDate  
                res.status(200).json({ success: true, data: createCycle });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Error adding cycle" });
        }
    }
}

export default new CycleController();
