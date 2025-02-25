import { Router } from "express";
import { createFeeding, editFeeding, getFeedingById } from "../controllers/feeding/feeding.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/createFeeding", authMiddleware, createFeeding);
router.get("/getFeedingById/:user_id", authMiddleware, getFeedingById);
router.put("/editFeeding/:feeding_id", authMiddleware, editFeeding);


export default router;