import bcrypt from "bcrypt";
export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
export const comparePasswords = async (password: string, hashed: string) =>
  bcrypt.compare(password, hashed);
