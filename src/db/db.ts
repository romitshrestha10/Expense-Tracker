import { Sequelize } from "sequelize-typescript";
import { User } from "../models";
import { Expense } from "../models";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "expense",
  logging: false,
  models: [User, Expense],
});
export default connection;
