import { Sequelize } from "sequelize-typescript";
import { Cycle, Summary, User } from "../models";
import { Expense } from "../models";
import { sharedExpense } from "../models/sharedExpenses";

const connection = new Sequelize({
  dialect: "mysql",
   host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  logging: false,
  models: [User, Expense, sharedExpense, Summary, Cycle],
});
export default connection;
