import pool from "../config/db";

//Obtener salud por id de usuario
export const getHealthById = async (batch_id: number) => {
    const { rows } = await pool.query(
        "SELECT * FROM salud_tratamiento WHERE id_lote = $1",
        [batch_id],
    );
    return rows;
};

//Crear salud de un usuario
export const createHealth = async (
    batch_id: number,
    disease: string,
    treatment: string,
) => {
    const date = new Date();
    const { rows } = await pool.query(
        "INSERT INTO salud_tratamiento (id_lote, enfermedad, tratamiento, fecha_creacion) VALUES ($1, $2, $3, $4)",
        [
            batch_id,
            disease,
            treatment,
            date,
        ],
    );
    return rows[0];
};

//elminar salud por id de salud
export const deleteHealth = async (health_id: number) => {
    const { rowCount } = await pool.query(
        "DELETE FROM salud_tratamiento WHERE id_tratamiento = $1",
        [health_id],
    );
    return rowCount;
};

//editar alimentacion por id de alimentacion
export const updatedHealth = async (
    health_id: number,
    batch_id: number,
    disease: string,
    treatment: string,
) => {
    const { rowCount } = await pool.query(
        "UPDATE salud_tratamiento SET id_lote = $1, enfermedad = $2, tratamiento = 3$ WHERE id_health = $4",
        [batch_id, disease, treatment, health_id],
    );
    return rowCount;
};
