import { Router } from "express";
import cycleController from "../controllers/cycleController";

const router = Router();

router.get(
  "/",  cycleController.getAllCycle
);
router.post("/", cycleController.postCycle);

export default router;
