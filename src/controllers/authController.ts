import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import { hashPassword, comparePasswords } from "../utils/bcrypt";
import { User } from "../models/users";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token });
  }

  async registerUser(req: Request, res: Response) {
    try {
      const existingUser = await User.findOne({ where: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      const hashedPassword = -(await bcrypt.hash(req.body.password, 10));
      req.body.password = hashedPassword;

      const newUser = await User.create({ ...req.body });

      // Respond with success
      res.status(201).json({
        message: "User registered successfully",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default new AuthController();
