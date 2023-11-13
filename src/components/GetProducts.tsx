import { useEffect, useState } from "react"
import Link from "next/link"

export default function GetProducts() {
    const [products, setProducts] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await fetch("https://fakestoreapi.com/products")
            const data = await respuesta.json()
            setProducts(data)
        }
        fetchData()
    }, [])

    return (
        <>
            <h1 className="mt-6 mb-3">Productos</h1>
            {
                products.map((product: any) => (
                    <article key={product.id} className="mb-10 group-block">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-[350px] w-full object-cover sm:h-[450px]"
                            />

                            <div className="mt-3 flex justify-between text-sm">
                                <div>
                                    <h3
                                        className="text-gray-900 group-hover:underline group-hover:underline-offset-4"
                                    >
                                        {product.title}
                                    </h3>

                                    <p className="mt-1.5 max-w-[45ch] text-xs text-gray-500">
                                        {product.description}
                                    </p>
                                </div>

                                <p className="text-gray-900">{product.price}</p>
                            </div>
                            <button>Agregar al carrito</button>
                    </article>
                ))
                }
        </>
    )
}