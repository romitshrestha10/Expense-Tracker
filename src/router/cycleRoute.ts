import { Router } from "express";
import CycleController from "../controllers/cycleController";
import authenticate from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";

const router = Router();
router.get("/", CycleController.getAllCycle);
router.post("/",authenticate, authorizeRoles(["user","admin"]), CycleController.postCycle);
router.get("/scycle", CycleController.summaryCycle);

// router.post("/", CycleController.postCycle);

export default router;
