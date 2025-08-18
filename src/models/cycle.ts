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

  @AllowNull(false)
  @Column(DataType.DATE)
  endDate!: Date;

  @HasMany(() => Expense, "expenseId")
  expenses!: Expense[];
}
