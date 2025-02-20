import { Router } from "express";
import { login, register, checkUser, changePassword } from "../controllers/auth/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/checkUser", checkUser);
router.post("/changePassword", changePassword);

export default router;