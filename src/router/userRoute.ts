import { Router } from "express";
import authenticate from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import UserController from "../controllers/userController";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles(["admin"]),
  UserController.getAllUser
);
router.post("/", UserController.postUser);

export default router;
