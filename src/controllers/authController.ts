import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import { hashPassword, comparePasswords } from "../utils/bcrypt";
import { User } from "../models/users";
import { sendEmail } from "../utils/sendEmail";
import crypto from "crypto";
import { Op } from "sequelize";

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

  async forgetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // res.status(200).json({
      //   message: "Password reset link sent to your email",
      //   data: user,
      // });
      const resetToken = crypto.randomBytes(32).toString("hex");

      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      user.passwordResetToken = hashedToken;
      user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();
      // console.log(hashedToken);

      const resetLink = `${req.protocol}://${req.get(
        "host"
      )}/reset-password/${resetToken}`;

      // console.log("Generated Reset Token (Sent in Email):", resetToken);
      // console.log("Hashed Token (Stored in DB):", hashedToken);

      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
      });
      res
        .status(200)
        .json({ message: "Password reset link sent to your email" });
    } catch (error) {
      console.error("Error in forgetPassword:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token } = req.params; // Extract token from URL
      const { newPassword } = req.body; // Get new password from request

      // 🔹 Hash the received token (this is the missing part)
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      // console.log("Received Token from URL:", token);
      // console.log("Hashed Token (for comparison):", hashedToken);

      // 🔹 Find user with matching hashed token & check expiration
      const user = await User.findOne({
        where: {
          passwordResetToken: hashedToken,
          passwordResetExpires: { [Op.gt]: new Date() },
        },
      });
      console.log(user);
      if (!user) {
        return res.status(400).json({ error: "Token is invalid or expired" });
      }

      // 🔹 Hash the new password before saving
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // 🔹 Update user with new password and clear reset token
      await user.update({
        password: hashedPassword,
        passwordResetToken: null, // Remove token
        passwordResetExpires: null,
      });

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default new AuthController();
