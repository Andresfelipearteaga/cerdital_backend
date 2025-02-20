import { Request, Response } from "express";
import { userLogin, userRegister, changePasswordByEmail, checkUserByEmail } from "../../services/auth/auth.service";

export const register = async (req: Request, res: Response) => {
    const { fullName, phone, email, password } = req.body;
    try {
        const user = await userRegister(fullName, phone, email, password);
        res.status(200).json({data: user, status: 200, message: "Registro exitoso" });
    } catch (error: any) {
        res.status(400).json({data: "", status: 400, error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //Recibir token del deivi
    
    try {
        const data = await userLogin(email, password);
        res.status(200).json({ data: data, status: 200, message: "Inicio de sesión exitoso" });
    } catch (error: any) {
        res.status(400).json({data: "", status: 400, error: error.message });
    }
};

export const checkUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const data = await checkUserByEmail(email);
        res.status(200).json({ data: "", status: 200, message: data  });
    } catch (error: any) {
        res.status(404).json({ data: "", status: 404, message: error.message });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const data = await changePasswordByEmail(email, password);
        res.status(200).json({ data: "", status: 200, message: data});
    } catch (error: any) {
        res.status(400).json({ data: "", status: 400, message: error.message });
    }
}
