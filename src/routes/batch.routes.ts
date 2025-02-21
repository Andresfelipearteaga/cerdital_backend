import { Router } from "express";
import { createBatch, getBatchById, editBatch } from "../controllers/batch/batch.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/createBatch", authMiddleware,createBatch);
router.get("/getBatchById/:user_id", authMiddleware, getBatchById);
router.put("/editBatch/:batch_id", authMiddleware, editBatch);


export default router;