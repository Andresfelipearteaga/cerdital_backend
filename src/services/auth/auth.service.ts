import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    createUser,
    findUserByEmail,
} from "../../repositories/user.repository";

export const userRegister = async (
    fullName: string,
    phone: number,
    email: string,
    password: string,
) => {
    const user = await findUserByEmail(email);
    if (user) throw new Error("El correo electrónico ya está registrado");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = await createUser(
        fullName,
        phone,
        email,
        hashedPassword,
    );

    return userCreated;
};

export const userLogin = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("El correo electrónico no existe");

    const isPasswordCorrect = await bcrypt.compare(password, user.contrasena);
    if (!isPasswordCorrect) throw new Error("Contraseña incorrecta");

    const token = createToken();
    const userInfo = {
        id: user.id_usuario,
        email: user.correo,
        fullName: user.nombre,
        phone: user.telefono,
    };
    const response = {
        user: userInfo,
        token,
    };
    return response;
};


export const checkUser = async (email: string) => {
    const user = await findUserByEmail(email);
    console.log(user);
};

const createToken = () => {
    return jwt.sign(
        { },
        process.env.JWT_SECRET!,
    );
};
