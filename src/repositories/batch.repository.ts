import pool from "../config/db";

//Obtener lotes por id de usuario
export const getBatchById = async (user_id: number) => {
    const { rows } = await pool.query(
        "SELECT * FROM lotes WHERE id_usuario = $1",
        [user_id],
    );
    return rows;
};

//Crear lote de un usuario
export const createBatch = async (
    user_id: number,
    batch_name: string,
    pig_registered: number,
    current_pig: number,
    race: string,
    average_weight: number,
) => {
    const date = new Date();
    const { rows } = await pool.query(
        "INSERT INTO lotes (id_usuario, nombre_lote, numero_cerdos_registrado, numeros_cerdos_actuales, raza, peso_promedio, fecha_creacion) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
            user_id,
            batch_name,
            pig_registered,
            current_pig,
            race,
            average_weight,
            date,
        ],
    );
    return rows[0];
};

//elminar lote por id de lote
export const deleteBatch = async (batch_id: number) => {
    const { rowCount } = await pool.query(
        "DELETE FROM lotes WHERE id_lote = $1",
        [batch_id],
    );
    return rowCount;
};

//editar lote por id de lote
export const updatedBatch = async (
    batch_id: number,
    race: string,
    average_weight: number,
) => {
    const { rowCount } = await pool.query(
        "UPDATE lotes SET raza = $1, peso_promedio = $2 WHERE id_lote = $3",
        [race, average_weight, batch_id],
    );

    return rowCount;
};
