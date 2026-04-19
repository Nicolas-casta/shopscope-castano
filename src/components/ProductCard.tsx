interface Props {
  id: number
  title: string
  price: number
  rating: number
  thumbnail: string
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  onClick: (id: number) => void
}

export function ProductCard({ id, title, price, rating, thumbnail, isFavorite, onToggleFavorite, onClick }: Props) {
  return (
    <div className="border rounded bg-white cursor-pointer hover:shadow" onClick={() => onClick(id)}>
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded-t" />
      <div className="p-3">
        <p className="text-sm font-medium line-clamp-2 mb-1">{title}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${price.toFixed(2)}</span>
          <div className="flex items-center gap-1 text-sm">
            <span className="flex items-center gap-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#facc15">
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
              {rating.toFixed(1)}
            </span>
            <button onClick={e => { e.stopPropagation(); onToggleFavorite(id) }}>
              {isFavorite ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e53e3e">
                  <path d="M480-147q-14 0-28.5-5T426-168L142-452q-42-42-62-91t-20-99q0-104 69.5-176T306-890q42 0 80.5 16t68.5 45l25 25 25-25q30-29 68.5-45t80.5-16q107 0 176.5 72T900-642q0 50-20 99t-62 91L534-168q-12 11-26.5 16T480-147Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#aaaaaa">
                  <path d="M480-147q-14 0-28.5-5T426-168L142-452q-42-42-62-91t-20-99q0-104 69.5-176T306-890q42 0 80.5 16t68.5 45l25 25 25-25q30-29 68.5-45t80.5-16q107 0 176.5 72T900-642q0 50-20 99t-62 91L534-168q-12 11-26.5 16T480-147Zm0-92 284-284q32-32 46-68t14-68q0-72-46-120t-118-48q-42 0-79 18.5T516-756l-36 38-36-38q-26-28-63-46.5T302-821q-72 0-117 48T140-653q0 32 14 68t46 68l280 278Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}