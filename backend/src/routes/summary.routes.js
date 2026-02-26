getAllSummaries

import { Router } from "express";
import { getAllSummaries, deleteSummary, getSummary } from "../controllers/Summary.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getAllSummaries)
router.route("/deleteSummary").delete(deleteSummary)
router.route("/:summaryId").get(getSummary)

export default router;