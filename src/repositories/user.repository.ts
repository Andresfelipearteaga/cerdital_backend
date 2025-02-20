import pool from "../config/db";

export const findUserByEmail = async (email: string) => {
    const { rows } = await pool.query(
        "SELECT * FROM usuarios WHERE correo = $1",
        [email],
    );
    return rows[0];
};

export const changePassword = async (email: string, password: string) => {
    console.log(email, password);
    const { rowCount }  = await pool.query (
        "UPDATE usuarios SET contrasena = $1 WHERE correo = $2", [password, email]
        );

    return rowCount;
};

export const createUser = async (
    fullName: string,
    phone: string,
    email: string,
    password: string,
) => {
    const { rows } = await pool.query(
        "INSERT INTO usuarios (nombre, telefono, correo, contrasena) VALUES ($1, $2, $3, $4) RETURNING id_usuario, correo",
        [fullName, phone, email, password],
    );
    return rows[0];
};
