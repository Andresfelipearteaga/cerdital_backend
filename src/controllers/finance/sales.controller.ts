import { Request, Response } from "express";
import {
    getSalesByIdUser,
    createSalesUser,
    deleteSalesUser
} from "../../services/finance/sales.service";

import { SalesResponse } from "../../interfaces/finance.interface";
import { Meta } from "../../interfaces/meta.interface";

export const getSalesById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const data = await getSalesByIdUser(Number(user_id));
        const response: SalesResponse = {
            sales: data,
            meta: {
                status: 200,
                message: "venta encontrado",
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


export const createSales = async (req: Request, res: Response) => {
     const { batch_id, pig_sold, average_weight, price_kg, user_id } = req.body;
     try { 
        const data = await createSalesUser(batch_id, pig_sold, average_weight, price_kg, user_id)
        const response: Meta = {
            status: 201,
            message: data 
        }
        res.status(201).json(response)

     } catch(error: any) {
        const response: Meta = {
            status: 400,
            message: error.message
        }
        res.status(400).json(response)
     }
}

export const deleteSales = async (req: Request, res: Response) => {
    const { sales_id } = req.params;
    try {
        const data = await deleteSalesUser(Number(sales_id));
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

// export const editSales = async (req: Request, res: Response) => {
//     const { sales_id } = req.params;
//     const { batch_id, pig_sold, average_weight, price_kg, user_id } = req.body;
//     try {
//         const data = await editSalesUser(Number(sales_id), batch_id, pig_sold, average_weight, price_kg, user_id);
//         const response: Meta = {
//             status: 200,
//             message: data,
//             };

//         res.status(200).json(response);
//     } catch (error: any) {
//         const response: Meta = {
//             status: 400,
//             message: error.message,
//             };
//         res.status(400).json(response);
//     }
// };  
