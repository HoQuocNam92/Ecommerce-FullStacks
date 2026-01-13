// import bcrypt from "bcryptjs";
import bcrypt, { hash } from 'bcrypt'
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
