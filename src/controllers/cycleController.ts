import { Request, Response } from "express";
import { Cycle } from "../models";

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

  async postCycle(req: Request, res: Response) {
    try {
      const createCycle = await Cycle.create({ ...req.body });
      res.status(200).json({ success: true, data: createCycle });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error adding cycle" });
    }
  }
}

export default new CycleController();
