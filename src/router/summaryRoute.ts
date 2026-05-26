import { Router } from "express";
import SummaryController from "../controllers/summaryController";

const router = Router();
router.get("/", SummaryController.getAllSummary);
router.get("/calculate", SummaryController.calculate);

router.post("/", SummaryController.postSummary);

export default router;
