import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import { hashPassword, comparePasswords } from "../utils/bcrypt";
import { User } from "../models/users";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.log("User not found for email:", email);
        return res.status(404).json({ error: "Invalid email or password" });
      }

      // Compare passwords
      const isPasswordValid = await comparePasswords(password, user.password);
      console.log("Password comparison result:", isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const token = generateToken({ id: user.id, role: user.role });
      res.json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const { name, username, password, gender, email, birthday, role } =
        req.body;
      const existingUser = await User.findOne({
        where: { email: email },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;

      const newUser = await User.create({
        name,
        username,
        password: hashedPassword,
        gender,
        email,
        birthday,
        role,
      });

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
