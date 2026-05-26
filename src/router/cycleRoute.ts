import { Router } from "express";
<<<<<<< HEAD
import cycleController from "../controllers/cycleController";

const router = Router();

router.get(
  "/",  cycleController.getAllCycle
);
router.post("/", cycleController.postCycle);
=======
import CycleController from "../controllers/cycleController";
import authenticate from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";

const router = Router();
router.get("/", CycleController.getAllCycle);
router.post("/",authenticate, authorizeRoles(["user","admin"]), CycleController.postCycle);
router.get("/scycle", CycleController.summaryCycle);
router.get("/susers", CycleController.summaryUsers);


// router.post("/", CycleController.postCycle);
>>>>>>> 5683216afd3a4760746f6d3c83b1b86c8f143ea3

export default router;
