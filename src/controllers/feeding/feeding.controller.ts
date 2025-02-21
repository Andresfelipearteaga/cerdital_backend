import { Request, Response } from "express";
import {
    getFeedingByIdUser, createFeedingUser, editFeedingUser
} from "../../services/feeding/feeding.service";

import { FeedingResponse, Meta } from "../../interfaces/feeding.interface";


export const getFeedingById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const data = await getFeedingByIdUser(Number(user_id));
        const response: FeedingResponse = {
            feeding: data,
            meta: {
                status: 200,
                message: "Alimentación encontrado",
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

export const createFeeding = async (req: Request, res: Response) => {
    const { batch_id, feeding_type, feeding_mark, amount, cost } = req.body;
    try {
        const data = await createFeedingUser(batch_id, feeding_type, feeding_mark, amount, cost);
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

export const editFeeding = async (req: Request, res: Response) => {
    const { batch_id, feeding_type, feeding_mark, amount, cost } = req.body;
    const { feeding_id } = req.params;
    try {
        const data = await editFeedingUser(Number(feeding_id), batch_id, feeding_type, feeding_mark, amount, cost);
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