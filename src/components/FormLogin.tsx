"use client"
import { useRef, FormEvent, useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/router";

export default function FormLogin() {

    //@ts-ignore
    const { user, setUser } = useContext(UserContext);

    const nameRef = useRef(null)
    const passwordRef = useRef(null)

    const router = useRouter()

    async function enviarDatos(evento: FormEvent) {
        evento.preventDefault()
        const usuario = {
            //@ts-ignore
            name: nameRef.current?.value,
            //@ts-ignore
            password: passwordRef.current?.value
        }

        const respuesta = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })

        if (respuesta.status != 200) {
            const error = await respuesta.json()
            alert(error.error)
        } else {
            const mensaje = await respuesta.json()
            //@ts-ignore
            setUser({...user, name: nameRef.current?.value})
            alert(mensaje.msg)
            router.push("/")
        }

    }

    return (
        <form onSubmit={enviarDatos} className="text-black min-h-screen" >
            <input type="text" placeholder="Nombre de usuario" ref={nameRef} />
            <input type="password" placeholder="Contraseña" ref={passwordRef} />
            <input type="submit" value="Conectarse" />
        </form>
    )
}