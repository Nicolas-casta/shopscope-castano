import { useState } from 'react'

interface Props {
    onLogin: (u: string, p: string) => Promise<void>
}

export function LoginForm({ onLogin }: Props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        setError('')
        try {
            await onLogin(username, password)
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Error')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-80">
                <h1 className="text-xl font-bold mb-4">ShopScope</h1>
                <input className="border w-full p-2 mb-2 rounded" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
                <input className="border w-full p-2 mb-2 rounded" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button onClick={handleLogin} disabled={loading} className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 disabled:opacity-50">
                    {loading ? 'Cargando...' : 'Entrar'}
                </button>
                <p className="text-xs text-gray-400 mt-3 text-center">emilys / emilyspass</p>
            </div>
        </div>
    )
}