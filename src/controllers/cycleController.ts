import { Request, Response } from "express";
import { Cycle } from "../models";
import dayjs from "dayjs"

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
        const startDate = req.body.startDate
        const frequency = req.body.frequency
        // console.log(frequency)
        // const endDate = startDate.setDate(startDate.getDate()+frequency)

const endDate = dayjs(startDate).add(frequency, "day").format("YYYY-MM-DD");

console.log(endDate);

        const createCycle = await Cycle.create({ ...req.body ,
        "endDate":endDate,
        "nextStartDate": dayjs(endDate).add(1, "day").format("YYYY-MM-DD")
      });
    //    createCycle.nextStartDate = createCycle.endDate  
      res.status(200).json({ success: true, data: createCycle });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error adding cycle" });
    }
  }
}

export default new CycleController();
