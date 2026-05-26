import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { Expense } from "./expenses";
@Table({
  timestamps: true,
  tableName: "cycle",
})
export class Cycle extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  startDate!: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  endDate!: Date;

<<<<<<< HEAD
  @AllowNull(true)
  @Column(DataType.DATE)
  nextDueDate!: Date;
=======
   @AllowNull(true)
  @Column(DataType.DATE)
  nextStartDate!: Date;

    @AllowNull(false)
  @Column(DataType.ENUM("active", "completed"))
  status!: string;

    @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isSettled!: boolean;

   @AllowNull(false)
  @Column(DataType.BIGINT)
  frequency!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  recurringExpense!: string;

  @AllowNull(true)
  @Column(DataType.BIGINT)
  recurringExpenseAmount!: number;

>>>>>>> 5683216afd3a4760746f6d3c83b1b86c8f143ea3

  @HasMany(() => Expense, "expenseId")
  expenses!: Expense[];


}
