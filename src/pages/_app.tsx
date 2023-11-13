import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { UserProvider } from '@/context/UserContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <UserProvider>
      <nav>
        <ul>
          <li><Link href={"/"}>Home</Link></li>
          <li><Link href={"/store"}>Tienda</Link></li>
          <li><Link href={"/auth/register"}>Registrarse</Link></li>  
          <li><Link href={"/auth/login"}>Conectarse</Link></li>  
         
        </ul>
      </nav>
      <Component {...pageProps} />
      </UserProvider>
    </>
  )
}
