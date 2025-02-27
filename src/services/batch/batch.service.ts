import {
    createBatch,
    getBatchById,
    updatedBatch,
} from "../../repositories/batch.repository";
import { createCost } from "../../repositories/cost.repository";

export const getBatchByIdUser = async (user_id: number) => {
    const batch = await getBatchById(user_id);
    console.log(batch);
    if (batch.length < 1) throw new Error("No has creado ningún lote");
    return batch;
};

export const createBatchUser = async (
    user_id: number,
    batch_name: string,
    pigs: number,
    race: string,
    average_weight: number,
) => {
    if (pigs < 1) throw new Error("Debe registrar al menos 1 cerdo");
    if (!average_weight) throw new Error("No hay peso promedio");
    if (!race) throw new Error("No hay raza");
    if (!batch_name) throw new Error("No hay nombre de lote");
    const pig_registered = pigs;
    const current_pig = pigs;
    const batchCreated = await createBatch(
        user_id,
        batch_name,
        pig_registered,
        current_pig,
        race,
        average_weight,
    );
    console.log("batch", batchCreated);
    const batch_id = batchCreated.id_lote;
    if (batchCreated === 0) throw new Error("Error al crear el lote");
    const costCreated = await createCost(batch_id, user_id);
    if (costCreated === 0) throw new Error("Error al crear el costo asociado");

    return "Lote, costo y progreso creados exitosamente";
};

export const editBatchUser = async (
    batch_id: number,
    race?: string,
    average_weight?: number,
    number_of_pigs?: number,
    pig_registered?: number,
    current_pig?: number,
) => {
    // Verificar si al menos un campo tiene un valor para actualizar
    console.log(
        race,
        average_weight,
        number_of_pigs,
        pig_registered,
        current_pig,
    );
    if (
        race === undefined && average_weight === undefined &&
        number_of_pigs === undefined || number_of_pigs === 0
    ) {
        throw new Error("No hay datos para actualizar");
    }

    // Si se proporciona number_of_pigs, se compara con pig_registered
    const num_pigs = Number(number_of_pigs);
    const reg_pigs = Number(pig_registered);
    let cur_pigs = Number(current_pig);
    let newCurrent;

    if (
        num_pigs !== undefined && reg_pigs !== undefined &&
        cur_pigs !== undefined
    ) {
        newCurrent = getCurrentPigs(num_pigs, reg_pigs, cur_pigs);
    }

    if (newCurrent! < 0) throw new Error("Cerdos insuficientes");
    // Llamar al repositorio para actualizar el lote
    const updatedBatchRow = await updatedBatch(
        batch_id,
        race,
        average_weight,
        number_of_pigs,
        newCurrent,
    );

    if (!updatedBatchRow || typeof updatedBatchRow !== "object") {
        throw new Error("Error inesperado al actualizar el lote");
    }
        const { rowCount } = updatedBatchRow;
        if (rowCount === 0) throw new Error("Error al actualizar el lote");

    return "Lote actualizado exitosamente";
    }


const getCurrentPigs = (
    num_pigs: number,
    reg_pigs: number,
    cur_pigs: number,
) => {
    let newCurrent;
    if (num_pigs === reg_pigs) {
        newCurrent = reg_pigs;
    } else if (num_pigs < reg_pigs) {
        let difference = reg_pigs - num_pigs;
        newCurrent = cur_pigs - difference;
    } else {
        let difference = num_pigs - reg_pigs;
        newCurrent = cur_pigs + difference;
    }
    return newCurrent;
};

