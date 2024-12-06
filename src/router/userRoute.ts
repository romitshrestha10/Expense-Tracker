import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

router.get("/", UserController.getAllUser);
router.post("/", UserController.postUser);

export default router;
