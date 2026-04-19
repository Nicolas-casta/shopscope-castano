import { useState, useCallback, useMemo } from 'react'
import { useAuth } from './hooks/useAuth'
import { useProducts } from './hooks/useProducts'
import { LoginForm } from './components/LoginForm'
import { ProductCard } from './components/ProductCard'
import { ProductDetail } from './components/ProductDetail'
import { CategoryFilter } from './components/CategoryFilter'
import { Pagination } from './components/Pagination'

export default function App() {
    const { token, login, logout } = useAuth()
    const [favorites, setFavorites] = useState<number[]>([])
    const [category, setCategory] = useState<string | undefined>()
    const [page, setPage] = useState(1)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const handleLogout = useCallback(() => { setFavorites([]); logout() }, [logout])
    const toggleFavorite = useCallback((id: number) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
    }, [])
    const favCount = useMemo(() => favorites.length, [favorites])

    const handleCategory = (slug: string | undefined) => { setCategory(slug); setPage(1) }

    const { products, total, loading, error, pageSize, forceRetry } = useProducts(token ?? '', handleLogout, category, page)

    if (!token) return <LoginForm onLogin={login} />

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">ShopScope</h1>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e53e3e">
                            <path d="M480-147q-14 0-28.5-5T426-168L142-452q-42-42-62-91t-20-99q0-104 69.5-176T306-890q42 0 80.5 16t68.5 45l25 25 25-25q30-29 68.5-45t80.5-16q107 0 176.5 72T900-642q0 50-20 99t-62 91L534-168q-12 11-26.5 16T480-147Z" />
                        </svg>
                        {favCount}
                    </span>
                    <button onClick={handleLogout} className="text-sm text-gray-500 underline">Cerrar sesión</button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-6">
                <CategoryFilter token={token} selected={category} onSelect={handleCategory} />

                {loading && <p className="text-center py-12 text-gray-500">Cargando...</p>}

                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-500 mb-2">{error}</p>
                        <button onClick={forceRetry} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Reintentar</button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map(p => (
                                <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} rating={p.rating} thumbnail={p.thumbnail}
                                    isFavorite={favorites.includes(p.id)} onToggleFavorite={toggleFavorite} onClick={setSelectedId} />
                            ))}
                        </div>
                        <Pagination page={page} total={total} pageSize={pageSize} onPageChange={setPage} />
                    </>
                )}
            </main>

            {selectedId !== null && <ProductDetail id={selectedId} token={token} onClose={() => setSelectedId(null)} />}
        </div>
    )
}