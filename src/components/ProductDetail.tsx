import { useState, useEffect, useMemo } from 'react'
import type { Product } from '../types'

interface Props {
    id: number
    token: string
    onClose: () => void
}

export function ProductDetail({ id, token, onClose }: Props) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`https://dummyjson.com/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json() as Promise<Product>)
            .then(data => { setProduct(data); setLoading(false) })
    }, [id, token])

    const price = useMemo(
        () => product ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price) : '',
        [product]
    )

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="font-semibold">Detalle</span>
                    <button onClick={onClose} className="text-gray-500">✕</button>
                </div>
                <div className="p-4">
                    {loading && <p className="text-center py-8 text-gray-500">Cargando...</p>}
                    {product && (
                        <div className="space-y-3">
                            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
                            <h2 className="font-bold text-lg">{product.title}</h2>
                            <div className="flex gap-2 items-center flex-wrap">
                                <span className="text-blue-600 font-bold text-xl">{price}</span>
                                <span className="text-sm text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg> {product.rating.toFixed(1)}</span>
                                <span className="text-sm bg-gray-100 px-2 py-0.5 rounded capitalize">{product.category}</span>
                                {product.stock === 0 && <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded">Sin stock</span>}
                            </div>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                            <p className="text-sm text-gray-500">Garantía: {product.warrantyInformation}</p>
                            <p className="text-sm text-gray-500">Envío: {product.shippingInformation}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}