import { createBatch, getBatchById, updatedBatch } from "../../repositories/batch.repository";

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
    if (batchCreated === 0) throw new Error("Error al crear el lote");
    return "Lote creado exitosamente";
};

export const editBatchUser = async (
    batch_id: number,
    race: string,
    average_weight: number,
    // number_of_pigs: number
) => {
    if (!race) throw new Error("No hay raza");
    if (!average_weight) throw new Error("No hay peso promedio");
    // if (!number_of_pigs) throw new Error("No hay Cerdos")

    

    const updatedBatchRow = await updatedBatch(batch_id, race, average_weight);
    if (updatedBatchRow === 0) throw new Error("Error al actualizar el lote");
    return "Lote actualizado exitosamente";
};

