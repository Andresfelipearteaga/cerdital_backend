import { Router } from "express";
import { createHealth, editHealth, getHealthById } from "../controllers/health/health.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/createHealth", authMiddleware, createHealth);
router.get("/getHealthById/:user_id", authMiddleware, getHealthById);
router.put("/editHealth/:health_id", authMiddleware, editHealth);

export default router;