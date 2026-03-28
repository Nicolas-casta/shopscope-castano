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
                    <span className="text-sm text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg> {favCount}</span>
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