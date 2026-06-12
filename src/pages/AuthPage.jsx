import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store'
import api from '../utils/api'

export default function AuthPage() {
    const [mode,    setMode]    = useState('login')
    const [showPw,  setShowPw]  = useState(false)
    const [form,    setForm]    = useState({ name: '', email: '', password: '' })
    const [error,   setError]   = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuthStore()
    const navigate = useNavigate()

    const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const handleSubmit = async () => {
        if (!form.email || !form.password) { setError('Please fill all fields'); return }
        if (mode === 'register' && !form.name) { setError('Name is required'); return }
        setLoading(true)
        setError('')
        try {
            const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
            const res = await api.post(endpoint, {
                name:     form.name,
                email:    form.email,
                password: form.password
            })
            login(res.data.user, res.data.accessToken)
            navigate('/account')
        } catch (e) {
            setError(e.response?.data?.error || 'Invalid credentials. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const Field = ({ label, name, type = 'text', placeholder }) => (
        <div>
            <label className="block text-[10px] tracking-widest uppercase text-gray-400 mb-2">{label}</label>
            <input type={type} value={form[name]} onChange={e => update(name, e.target.value)}
                   placeholder={placeholder}
                   onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                   className="w-full bg-zinc-900 border border-white/20 text-white text-sm px-4 py-3 outline-none focus:border-yellow-400/50 transition-colors placeholder:text-gray-600" />
        </div>
    )

    return (
        <div className="min-h-screen flex">
            {/* Left image */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=90"
                     alt="Auth" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col justify-end p-16">
                    <Link to="/" className="font-display text-2xl text-yellow-400 tracking-widest mb-8 block">SHOPSPHERE</Link>
                    <h2 className="font-display text-4xl text-white leading-snug">
                        The world's finest<br />timepieces await<br />
                        <span className="text-yellow-400 italic">your collection.</span>
                    </h2>
                </div>
            </div>

            {/* Right form */}
            <div className="flex-1 flex items-center justify-center bg-black px-8">
                <div className="w-full max-w-md">
                    <Link to="/" className="font-display text-2xl text-yellow-400 tracking-widest mb-12 block lg:hidden">SHOPSPHERE</Link>

                    {/* Toggle */}
                    <div className="flex mb-10 border-b border-white/10">
                        {[['login', 'Sign In'], ['register', 'Create Account']].map(([m, label]) => (
                            <button key={m} onClick={() => { setMode(m); setError('') }}
                                    className={`flex-1 pb-4 text-xs tracking-widest uppercase transition-colors ${
                                        mode === m ? 'text-yellow-400 border-b border-yellow-400' : 'text-gray-500 hover:text-gray-300'
                                    }`}>
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-5">
                        {mode === 'register' && <Field label="Full Name" name="name" placeholder="Your full name" />}
                        <Field label="Email" name="email" type="email" placeholder="collector@example.com" />
                        <div>
                            <label className="block text-[10px] tracking-widest uppercase text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <input type={showPw ? 'text' : 'password'} value={form.password}
                                       onChange={e => update('password', e.target.value)}
                                       onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                       placeholder="••••••••"
                                       className="w-full bg-zinc-900 border border-white/20 text-white text-sm px-4 py-3 pr-12 outline-none focus:border-yellow-400/50 transition-colors placeholder:text-gray-600" />
                                <button onClick={() => setShowPw(v => !v)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-xs">{error}</p>}

                        <button onClick={handleSubmit} disabled={loading}
                                className="w-full bg-yellow-400 text-black text-xs tracking-widest uppercase py-3.5 font-medium hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}