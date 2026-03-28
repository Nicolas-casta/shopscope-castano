import { useState, useEffect } from 'react'
import type { Category } from '../types'

interface Props {
    token: string
    selected: string | undefined
    onSelect: (slug: string | undefined) => void
}

export function CategoryFilter({ token, selected, onSelect }: Props) {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json() as Promise<Category[]>)
            .then(setCategories)
    }, [token])

    return (
        <div className="flex gap-2 flex-wrap mb-4">
            <button onClick={() => onSelect(undefined)} className={`px-3 py-1 rounded-full text-sm border ${!selected ? 'bg-blue-600 text-white' : 'border-gray-300'}`}>
                Todos
            </button>
            {categories.map(cat => (
                <button key={cat.slug} onClick={() => onSelect(cat.slug)} className={`px-3 py-1 rounded-full text-sm border capitalize ${selected === cat.slug ? 'bg-blue-600 text-white' : 'border-gray-300'}`}>
                    {cat.name}
                </button>
            ))}
        </div>
    )
}