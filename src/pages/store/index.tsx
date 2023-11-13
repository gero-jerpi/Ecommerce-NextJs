import GetProducts from "@/components/GetProducts";
import Link from "next/link"

export default function Home() {

  return (
    <>
      <>
      <ul className="flex gap-3 ml-6 mt-5">
        <li><Link href={"store/men's clothing"}>Ropa Hombres</Link></li>
        <li><Link href={"/store/jewelery"}>Joyas</Link></li>
        <li><Link href={"/store/electronics"}>Electronico</Link></li>
        <li><Link href={"/store/women's clothing"}>Ropa Mujeres</Link></li>
      </ul>
      <GetProducts />
      </>
    </>
  )
}
