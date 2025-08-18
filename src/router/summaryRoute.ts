import { Router } from "express";
import SummaryController from "../controllers/summaryController";

const router = Router();
router.get("/", SummaryController.getAllSummary);
router.post("/", SummaryController.postSummary);

export default router;
