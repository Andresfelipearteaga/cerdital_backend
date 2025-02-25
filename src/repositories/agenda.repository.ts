import pool from "../config/db";

//Obtener agenda por id de usuario
export const getAgendaById = async (user_id: number) => {
    const { rows } = await pool.query(
        "SELECT * FROM agenda WHERE id_usuario = $1",
        [user_id],
    );
    return rows;
};

//Crear agenda de un usuario
export const createAgenda = async (
    user_id: number,
    title: string,
    description: string,    
    event_date: string,
  
) => {
    const { rows } = await pool.query(
        "INSERT INTO agenda (id_usuario, titulo, descripcion, fecha_evento) VALUES ($1, $2, $3, $4  )",
        [
            user_id,
            title,
            description,
            event_date,
        ],
    );
    return rows[0];
};