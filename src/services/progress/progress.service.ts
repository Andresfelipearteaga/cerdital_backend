import {
    getProgressById,
    updateProgress,
} from "../../repositories/progress.repository";

import {
    getOneBatchById,
    updatedBatch,
} from "../../repositories/batch.repository";

export const getProgressByIdUser = async (user_id: number) => {
    if (!user_id) throw new Error("Sin usuario");
    const progress = await getProgressById(user_id);
    if (progress.length < 1) throw new Error("No has creado ningún progreso");
    return progress;
};

export const updateProgressUser = async (
    progress_id: number,
    batch_id: number,
    date_weight: string,
    weekly_average_weight: number,
    mortality: number,
) => {
    if (!progress_id) throw new Error("No hay progreso seleccionado");
    if (!batch_id) throw new Error("No hay lote seleccionado");
    if (!date_weight) throw new Error("No hay fecha de peso");
    if (!weekly_average_weight) throw new Error("No hay peso promedio");
    if (mortality === undefined || mortality === null) {
        throw new Error("No hay mortalidad");
    }

    let current_pig = 0;

    // Si la mortalidad es mayor a 0, validar contra current pigs
    if (mortality > 0) {
        const batch = await getOneBatchById(batch_id);
        if (batch.length < 1) throw new Error("No existe el lote");
        
        current_pig = batch[0].numeros_cerdos_actuales;
        
        if (current_pig < mortality) {
            throw new Error("No puedes registrar una mortalidad mayor a la cantidad de cerdos en el lote");
        }
    }

    // Actualizar progreso
    const progressUpdated = await updateProgress(
        progress_id,
        batch_id,
        date_weight,
        weekly_average_weight,
        mortality
    );

    if (progressUpdated === 0) {
        throw new Error("Error al actualizar el progreso");
    }

    // Calcular nuevo número de cerdos
    const newCurrent = current_pig - mortality;

    // Actualizar el lote
    const batchUpdated = await updatedBatch(
        batch_id,
        undefined,
        undefined,
        undefined,
        newCurrent
    );

    if (!batchUpdated || typeof batchUpdated !== "object") {
        throw new Error("Error inesperado al actualizar el lote");
    }

    const { rowCount, current_pig_in_db } = batchUpdated;

    // Verificar rowCount
    if (rowCount === 0) {
        throw new Error("Error al actualizar el lote");
    }

    // Si current_pig_in_db es 0, actualizar el estado del lote
    if (current_pig_in_db === 0) {
        const newStatus = false;
        const updatedBatchStatus = await updatedBatch(
            batch_id,
            undefined,
            undefined,
            undefined,
            undefined,
            newStatus
        );

        if (!updatedBatchStatus || typeof updatedBatchStatus !== "object") {
            throw new Error("Error inesperado al actualizar el lote");
        }

        if (updatedBatchStatus.rowCount === 0) {
            throw new Error("Error al actualizar el estado del lote");
        }
    }

    return "Progreso actualizado exitosamente";
};
