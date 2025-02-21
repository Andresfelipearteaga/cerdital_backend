import pool from "../config/db";

//Obtener alimentacion por id de usuario
export const getFeedingById = async (batch_id: number) => {
    const { rows } = await pool.query(
        "SELECT * FROM alimentacion WHERE id_lote = $1",
        [batch_id],
    );
    return rows;
};

//Crear alimentacion de un usuario
export const createFeeding = async (
    batch_id: number,
    feeding_type: string,
    feeding_mark: string,
    amount: number,
    cost: number,
) => {
    const date = new Date();
    const { rows } = await pool.query(
        "INSERT INTO alimentacion (id_lote, tipo_alimento, marca_alimento, cantidad_kg, costo_unitario, fecha_creacion) VALUES ($1, $2, $3, $4, $5, $6)",
        [
            batch_id,
            feeding_type,
            feeding_mark,
            amount,
            cost,
            date,
        ],
    );
    return rows[0];
};

//elminar alimentacion por id de alimentacion
export const deleteFeeding = async (feeding_id: number) => {
    const { rowCount } = await pool.query(
        "DELETE FROM alimentacion WHERE id_alimentacion = $1",
        [feeding_id],
    );
    return rowCount;
};

//editar alimentacion por id de alimentacion
export const updatedFeeding = async (
    feeding_id: number,
    // feeding_type: string, SE PUEDE EDITAR EL TIPO DE ALIMENTO? SE PUEDE EDITAR Y MOSTRARLO DE TITULO EN LA INTERFAZ
    feeding_mark: string,
    amount: number,
    cost: number,
) => {
    const { rowCount } = await pool.query(
        "UPDATE alimentacion SET marca_alimento = $1, cantidad_kg = $2, consto_unitario = 3$ WHERE id_lote = $4",
        [feeding_mark, amount, cost, feeding_id],
    );
    return rowCount;
};
