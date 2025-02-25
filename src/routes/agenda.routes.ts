import { Router } from "express";
import { getAgenda, createAgenda } from "../controllers/agenda/agenda.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/agenda/:user_id", authMiddleware, getAgenda);
router.post("/agenda/:user_id", authMiddleware,createAgenda);

export default router;