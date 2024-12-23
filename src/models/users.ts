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
  HasMany,
} from "sequelize-typescript";
import { Expense } from "./expenses";
@Table({
  timestamps: true,
  tableName: "user",
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  role!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("male", "female", "other"))
  gender!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  birthday!: Date;

  @HasMany(() => Expense, "userId")
  expenses!: Expense[];
}
