import { Request, Response, NextFunction } from "express";

const authorizeRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the user object exists (ensured by authMiddleware)
    if (!req.user) {
      return res.status(403).json({ error: "Forbidden: No user data found" });
    }

    // Extract the role from the user object
    const { role } = req.user;

    // Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    // If role is authorized, proceed to the next middleware/route handler
    next();
  };
};

export default authorizeRoles;
