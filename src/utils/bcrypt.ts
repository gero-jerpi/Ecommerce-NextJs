import { genSalt, hash } from "bcrypt";

export async function encriptarPassword(password: string){
    const saltos = await genSalt(10);
    const passwordHash = await hash(password, saltos)

    return passwordHash;
}