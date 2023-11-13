import type { NextApiRequest, NextApiResponse } from "next";
import { emailRegex, passwordRegex } from "@/utils/regex"
import { encriptarPassword } from "@/utils/bcrypt"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function loginHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const usuario = await req.body

    if (usuario.name === "" || usuario.password === "" || usuario.email === "") {
        return res.status(400).json({ error: "Faltan datos" });
    }

    if (!usuario.email.match(emailRegex)) {
        return res.status(400).json({ error: "Email invalido" });
    }

    if (!usuario.password.match(passwordRegex)) {
        return res.status(400).json({ error: "Contraseña invalida" });
    }

    const nombreGuardado = await prisma.usuarios.findUnique({
        where: {
            name: usuario.name,
        }
    });

    if(usuario.name == nombreGuardado?.name){
        return res.status(400).json({error: "Nombre ya registrado"})
    }

    const emailGuardado = await prisma.usuarios.findUnique({
        where: {
            email: usuario.email,
        }
    });

    
    if(usuario.email == emailGuardado?.email){
        return res.status(400).json({error: "Email ya registrado"})
    }
 
    const passwordHash = await encriptarPassword(usuario.password)
    console.log(passwordHash);

    const usuarioGuardado = { ...usuario, password: passwordHash }

    const usuarioSubido = await prisma.usuarios.create({ data: usuarioGuardado })

    if (!usuarioSubido) {
        return res.status(500).json({ error: "Error en la base de datos" })
    }

    return res.status(201).json({ msg: "Usuario creado con éxito" });

}


