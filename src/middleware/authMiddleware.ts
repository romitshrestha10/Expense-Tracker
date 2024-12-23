import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../secrets";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: number;
      role: string;
      email?: string;
    };
    req.user = decoded; // Now TypeScript recognizes this.
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
