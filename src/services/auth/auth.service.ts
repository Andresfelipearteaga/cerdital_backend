import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    createUser,
    findUserByEmail,
    changePassword,
} from "../../repositories/user.repository";

export const userRegister = async (
    fullName: string,
    phone: string,
    email: string,
    password: string,
) => {
    if (password.length < 5) throw new Error("La contraseña debe tener al menos 5 caracteres");
    if (email.length < 5) throw new Error("Email Inválido"); 
    if (phone.length < 10) throw new Error("Telefono inválido");
    if (!fullName) throw new Error("Nombres inválidos");


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

    // const token = createToken();
    const response = {
        id: user.id_usuario,
        email: user.correo,
        fullName: user.nombre,
        phone: user.telefono,
    };

    return response;
};


export const checkUserByEmail = async (email: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("El correo electrónico no existe");

    return 'Usuario encontrado';
};

export const changePasswordByEmail = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userUpdated = await changePassword(email, hashedPassword);
    if (password.length < 5) throw new Error("La contraseña debe tener al menos 5 caracteres");
    if (userUpdated! === 0) throw new Error("Error al cambiar la contraseña");
    console.log(userUpdated);
    return 'Contraseña cambiada exitosamente';
};

// const createToken = () => {
//     return jwt.sign(
//         { },
//         process.env.JWT_SECRET!,
//     );
// };
