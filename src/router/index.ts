import express from "express";

import user from "./userRoute";
import expense from "./expenseRoute";
import auth from "./authRoute";
import summary from "./summaryRoute";

import router from "./userRoute";

export const routes = express.Router();

routes.use("/user", user);
routes.use("/expense", expense);
routes.use("/auth", auth);
routes.use("/summary", summary);
