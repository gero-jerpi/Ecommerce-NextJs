import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import Link from "next/link"

export default function Home() {

  //@ts-ignore
  const { user } = useContext(UserContext)


  return (
   <section className="min-h-screen">
       {user.name ? (
        <p>
          ¡Bienvenido {user.name}!
        </p>
       ) : (
        <>
          <Link href={"/auth/login"}>¿Desea iniciar sesión?</Link>
        </>
       )}
   </section>
  )
}
