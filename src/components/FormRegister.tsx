"use client"
import { useRef, FormEvent } from "react"
import { useRouter } from "next/router"

export default function RegisterLogin() {
    const nameRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRef = useRef(null)

    const router = useRouter()

    async function enviarDatos(evento: FormEvent) {
        evento.preventDefault()
        const usuario = {
            //@ts-ignore
            name: nameRef.current?.value,
            //@ts-ignore
            password: passwordRef.current?.value,
            //@ts-ignore
            email: emailRef.current?.value
        }
        
        const respuesta = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })

        if (respuesta.status != 201) {
            const error = await respuesta.json()
            alert(error.error);
        }else{
            const mensaje = await respuesta.json()
            alert(mensaje.msg)
            router.push("/auth/login")
        }

    }

    return (
        <form onSubmit={enviarDatos} className="text-black min-h-screen">
            <input type="text" placeholder="Nombre de usuario" ref={nameRef} />
            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Contraseña" ref={passwordRef} />
            <input type="submit" value="Registrarse"/>
        </form>
    )
}