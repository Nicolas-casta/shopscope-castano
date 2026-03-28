interface Props {
    page: number
    total: number
    pageSize: number
    onPageChange: (p: number) => void
}

export function Pagination({ page, total, pageSize, onPageChange }: Props) {
    const totalPages = Math.ceil(total / pageSize)
    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center items-center gap-3 mt-6">
            <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-40">
                ← Anterior
            </button>
            <span className="text-sm text-gray-600">Página {page} de {totalPages}</span>
            <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-40">
                Siguiente →
            </button>
        </div>
    )
}