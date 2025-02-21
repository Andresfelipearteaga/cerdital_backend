import pool from "../config/db";

//Obtener costo por id de usuario
export const getCostById = async (batch_id: number) => {
    const { rows } = await pool.query(
        "SELECT * FROM costo_unitario WHERE id_lote = $1",
        [batch_id],
    );
    return rows;
};

//Crear costo de un usuario
export const createCost = async (
    batch_id: number,
    cost: number,
) => {
    const date = new Date();
    const { rows } = await pool.query(
        "INSERT INTO costo_unitario (id_lote, costo_unitario, fecha_creacion) VALUES ($1, $2, $3)",
        [
            batch_id,
            cost,
            date,
        ],
    );
    return rows[0];
};

//elminar costo por id de costo
export const deleteCost = async (cost_id: number) => {
    const { rowCount } = await pool.query(
        "DELETE FROM costo_unitario WHERE id_costo = $1",
        [cost_id],
    );
    return rowCount;
};

//editar costo por id de costo
export const updatedCost = async (
    cost_id: number,
    batch_id: number,
    cost: number,
) => {
    const { rowCount } = await pool.query(
        "UPDATE costo_unitario SET id_lote = $1, costo_unitario = $2, fecha_creacion = $3 WHERE id_costo = $4",
        [batch_id, cost, cost_id],
    );
    return rowCount;
};  