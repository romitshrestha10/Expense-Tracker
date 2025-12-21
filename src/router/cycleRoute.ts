import { Router } from "express";
import CycleController from "../controllers/cycleController";

const router = Router();
router.get("/", CycleController.getAllCycle);
router.post("/", CycleController.postCycle);

export default router;
