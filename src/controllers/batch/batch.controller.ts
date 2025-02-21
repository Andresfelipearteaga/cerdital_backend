import { Request, Response } from "express";
import {
    createBatchUser, getBatchByIdUser, editBatchUser,
} from "../../services/batch/batch.service";

import { BatchResponse, Meta } from "../../interfaces/batch.interface";


export const getBatchById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const data = await getBatchByIdUser(Number(user_id));
        const response: BatchResponse = {
            batch: data,
            meta: {
                status: 200,
                message: "Lote encontrado",
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

export const createBatch = async (req: Request, res: Response) => {
    const { user_id, batch_name, pigs, race, average_weight } = req.body;
    try {
        const data = await createBatchUser(user_id, batch_name, pigs, race, average_weight);
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

export const editBatch = async (req: Request, res: Response) => {
    const { race, average_weight } = req.body;
    const { batch_id } = req.params;
    try {
        const data = await editBatchUser(Number(batch_id), race, average_weight);
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