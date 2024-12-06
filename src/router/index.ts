import express from "express";

import user from "./userRoute";
import expense from "./expenseRoute";

export const routes = express.Router();

routes.use("/user", user);
routes.use("/expense", expense);
