import { Request, Response } from "express";
import { userLogin, userRegister } from "../../services/auth/auth.service";

export const register = async (req: Request, res: Response) => {
    const { fullName, phone, email, password } = req.body;
    try {
        const user = await userRegister(fullName, phone, email, password);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const data = await userLogin(email, password);
        res.status(200).json({ data });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
