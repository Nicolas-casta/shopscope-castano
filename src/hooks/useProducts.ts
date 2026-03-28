import { useState, useEffect } from 'react'
import type { Product, ProductsResponse } from '../types'

export function useProducts(token: string, logout: () => void, category?: string, page = 1) {
    const [products, setProducts] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [retry, setRetry] = useState(0)

    const limit = 12
    const skip = (page - 1) * limit

    useEffect(() => {
        setLoading(true)
        setError(null)

        const url = category
            ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
            : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`

        fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (res.status === 401) { logout(); return null }
                if (!res.ok) throw new Error('No se pudo cargar')
                return res.json() as Promise<ProductsResponse>
            })
            .then(data => { if (data) { setProducts(data.products); setTotal(data.total) } })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [token, category, page, retry])

    return { products, total, loading, error, pageSize: limit, forceRetry: () => setRetry(r => r + 1) }
}