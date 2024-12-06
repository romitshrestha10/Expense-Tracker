import {
  Table,
  Model,
  Column,
  DataType,
  IsEmail,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
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
  @Column(DataType.INTEGER)
  amount!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  category!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("male", "female", "other"))
  gender!: string;

  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  date!: Date;

  //userId
}
