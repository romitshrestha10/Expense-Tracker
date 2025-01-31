import { Router } from "express";

import AuthController from "../controllers/authController";

const router = Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.registerUser);
router.post("/forgot-password", AuthController.forgetPassword);
router.post("/reset-password/:token", AuthController.resetPassword);

export default router;
