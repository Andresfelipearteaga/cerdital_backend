import { Request, Response } from "express";
import { getHealthByIdUser, createHealthUser, editHealthUser } from "../../services/health/health.service";

import { HealthResponse } from "../../interfaces/health.interface";
import { Meta } from "../../interfaces/meta.interface";

export const getHealthById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const data = await getHealthByIdUser(Number(user_id));
        const response: HealthResponse = {
            health: data,
            meta: {
                status: 200,
                message: "Salud encontrada",
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

export const createHealth = async (req: Request, res: Response) => {
    const { batch_id, disease, treatment, user_id } = req.body;
    try {
        const data = await createHealthUser(batch_id, disease, treatment, user_id);
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

export const editHealth = async (req: Request, res: Response) => {
    const { health_id } = req.params;
    const { batch_id, disease, treatment } = req.body;
    try {
        const data = await editHealthUser(Number(health_id), batch_id, disease, treatment);
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