import express from "express";

import user from "./userRoute";
import expense from "./expenseRoute";
import auth from "./authRoute";

import router from "./userRoute";

export const routes = express.Router();

routes.use("/user", user);
routes.use("/expense", expense);
router.use("/auth", auth);
