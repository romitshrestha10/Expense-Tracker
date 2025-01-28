// // import { Expense } from "../models";

// // const userExpenses = (id: number) => {
// //   const a = Expense.findAll({
// //     where: {
// //       id: id,
// //     },
// //   });

// //   return a;
// // };

// // export default userExpenses;

// export const a = 9;
// export function multiply(a: number, b: number): number {
//   return a * b;
// }

// function c(a: string) {
//   return a;
// }

// export default c;

// // export default class Logger{
// //   log(message: string): void {
// //     console.log("Log:", message)
// //   }
// }

// export function addition(a: number, b: number) {
//   return a + b;
// }

// export const b= 1
// export const a = function (b: string) {
//   const c = b.charAt(0).toUpperCase() + b.slice(1);
//   return c;
// };

export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
  divide(a: number, b: number): number {
    return a / b;
  }
}

export type Operation = "add" | "subtract" | "divide";
