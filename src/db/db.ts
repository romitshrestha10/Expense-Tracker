import { Sequelize } from "sequelize-typescript";
import { User } from "../models";
import { Expense } from "../models";
import { sharedExpense } from "../models/sharedExpenses";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "expense",
  logging: false,
  models: [User, Expense, sharedExpense],
});
export default connection;
