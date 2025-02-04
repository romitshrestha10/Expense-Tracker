import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./users";
import { Expense } from "./expenses";
@Table({
  timestamps: true,
  tableName: "sharedExpense",
})
export class sharedExpense extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  shareAmount!: string;

  @AllowNull(false)
  @ForeignKey(() => Expense)
  @Column({
    type: DataType.BIGINT,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  expenseId!: number;

  //userId
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  userId!: number;

  @BelongsTo(() => User, "userId")
  user!: User;
}
