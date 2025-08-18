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
@Table({
  timestamps: true,
  tableName: "summary",
})
export class Summary extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  totalAmount!: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  PendingAmount!: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  individualExpense!: number;

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
