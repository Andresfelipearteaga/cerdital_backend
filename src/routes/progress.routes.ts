import { Router } from "express";
import { getProgressById, updateProgress } from "../controllers/progress/progress.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get("/getProgressById/:user_id", authMiddleware, getProgressById);
router.put("/editProgress/:progress_id", authMiddleware, updateProgress);

export default router;