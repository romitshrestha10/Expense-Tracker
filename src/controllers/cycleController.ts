import { Request, Response } from "express";
import { Cycle, Expense, User } from "../models";

class cycleController {
  async getAllCycle(req: Request, res: Response) {
    try {
      const document = await Cycle.findAll({
        include: [Expense],
      });
      res.status(200).json({ success: true, data: document });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching document" });
    }
  }

  async postCycle(req: Request, res: Response) {
    try {
      const createUser = await Cycle.create({ ...req.body });
      res.status(200).json({ success: true, data: createUser });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error adding document" });
    }
  }
}

export default new cycleController();
