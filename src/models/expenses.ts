import {
  Table,
  Model,
  Column,
  DataType,
  IsEmail,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./users";
import { Cycle } from "./cycle";
@Table({
  timestamps: true,
  tableName: "expense",
})
export class Expense extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  amount!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  category!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  frequency!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isShared!: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isSettled!: boolean;

//  @AllowNull(false)
//   @Column(DataType.DATE)
//   startDate!: Date;

//   @AllowNull(false)
//   @Column(DataType.DATE)
//   endDate!: Date;

//   @AllowNull(false)
//   @Column(DataType.DATE)
//   nextDueDate!: Date;
  
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

 //cycleId
  @AllowNull(false)
  @ForeignKey(() => Cycle)
  @Column({
    type: DataType.BIGINT,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  cycleId!: number;

  @BelongsTo(() => Cycle, "cycleId")
  cycle!: Cycle;

}
