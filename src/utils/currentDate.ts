import { Cycle } from "../models";
import { Request, Response } from "express";


const { Op } = require("sequelize");

export const currentCycleId = async(): Promise<number> => {
    const today = new Date();
    const cycle = await Cycle.findOne({
        where: {
            startDate: {[Op.lte]: today},
            endDate: {[Op.gte]: today},
        },
        attributes: ["id"]
    })


  if (!cycle) {
    throw new Error("No active cycle found");
  }

  return cycle.id;
};