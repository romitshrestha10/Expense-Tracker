import { Request, Response } from "express";
import { User } from "../models";

class UserController {
  async getAllUser(req: Request, res: Response) {
    try {
      const document = await User.findAll();
      res.status(200).json({ success: true, data: document });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching document" });
    }
  }

  async postUser(req: Request, res: Response) {
    try {
      const createUser = await User.create({ ...req.body });
      res.status(200).json({ success: true, data: createUser });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching document" });
    }
  }
}

export default new UserController();
