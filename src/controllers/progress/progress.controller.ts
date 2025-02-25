import { Request, Response } from "express";
import {
    getProgressByIdUser,
    updateProgressUser,
} from "../../services/progress/progress.service";

import { ProgressResponse } from "../../interfaces/progress.interface";
import { Meta } from "../../interfaces/meta.interface";

export const getProgressById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const data = await getProgressByIdUser(Number(user_id));
        const response: ProgressResponse = {
            progress: data,
            meta: {
                status: 200,
                message: "progreso encontrado",
            },
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: Meta = {
            status: 404,
            message: error.message,
        };
        res.status(404).json(response);
    }
};

export const updateProgress = async (req: Request, res: Response) => {
    const { progress_id } = req.params;
    const { batch_id, date_weight, weekly_average_weight, mortality } = req.body;
    try {
        const data = await updateProgressUser( Number(progress_id),batch_id, date_weight, weekly_average_weight, mortality);
        const response: Meta = {
            status: 200,
            message: data,
        };
        res.status(200).json(response);
    } catch (error: any) {
        const response: Meta = {
            status: 400,
            message: error.message,
        };
        res.status(400).json(response);
    }
};