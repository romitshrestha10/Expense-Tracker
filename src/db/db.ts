import { Sequelize } from "sequelize-typescript";
import { Summary, User } from "../models";
import { Expense } from "../models";
import { sharedExpense } from "../models/sharedExpenses";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "expense",
  logging: false,
  models: [User, Expense, sharedExpense, Summary],
});
export default connection;
