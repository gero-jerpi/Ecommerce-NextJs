import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function loginHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const usuario = req.body
        if (usuario.name === "" || usuario.password === "") {
            return res.status(400).json({ error: "Faltan datos" })
        }

        const usuarioDB = await prisma.usuarios.findUnique({
            where: {
                name: usuario.name
            }
        })

        if (!usuarioDB) {
            return res.status(400).json({ error: "Nombre de usuario incorrecto" })
        }

        const compararContraseñas = await compare(
            usuario.password,
            usuarioDB.password
        )

        if (!compararContraseñas) {
            return res.status(400).json({ error: "Contraseña incorrecta" })
        }

        res.status(200).json({ msg: "Usuario logeado" })
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}