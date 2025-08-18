import { Request, Response } from "express";
import { Summary } from "../models";

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
}

export default new SummaryController();
