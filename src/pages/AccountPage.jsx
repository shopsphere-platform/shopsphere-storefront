import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, User, LogOut, ChevronRight } from 'lucide-react'
import { useAuthStore, useWishlistStore } from '../store'
import api from '../utils/api'
import { useEffect } from 'react'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function AccountPage() {
    const [tab,    setTab]    = useState('orders')
    const [orders, setOrders] = useState([])
    const { user, logout } = useAuthStore()
    const { items: wishlist } = useWishlistStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            api.get('/api/orders/my')
                .then(res => setOrders(res.data))
                .catch(err => console.error(err))
        }
    }, [user])

    const handleLogout = () => { logout(); navigate('/') }

    if (!user) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-400 text-xl mb-6 font-display">Please sign in to view your account</p>
                <Link to="/auth" className="bg-yellow-400 text-black text-xs tracking-widest uppercase px-8 py-3 font-medium hover:bg-yellow-300 transition-colors">
                    Sign In
                </Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="mb-12">
                    <p className="text-xs tracking-widest uppercase text-yellow-400 mb-2">My Account</p>
                    <h1 className="font-display text-4xl text-white">Welcome back, {user.name}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-zinc-900 border border-white/10 p-6 mb-3">
                            <div className="w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mb-3">
                                <span className="font-display text-lg text-yellow-400">{user.name?.charAt(0)}</span>
                            </div>
                            <p className="text-sm text-white font-light">{user.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 overflow-hidden">
                            {[['orders', 'Orders', ShoppingBag], ['wishlist', 'Wishlist', Heart], ['profile', 'Profile', User]].map(([id, label, Icon]) => (
                                <button key={id} onClick={() => setTab(id)}
                                        className={`w-full flex items-center gap-3 px-5 py-3.5 text-xs tracking-wide uppercase transition-all border-b border-white/5 last:border-0 ${
                                            tab === id ? 'text-yellow-400 bg-yellow-400/5 border-l-2 border-l-yellow-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}>
                                    <Icon size={13} /> {label} <ChevronRight size={11} className="ml-auto opacity-40" />
                                </button>
                            ))}
                            <button onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-5 py-3.5 text-xs tracking-wide uppercase text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all">
                                <LogOut size={13} /> Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {tab === 'orders' && (
                            <div className="space-y-3">
                                {orders.length === 0 ? (
                                    <div className="text-center py-20">
                                        <ShoppingBag size={36} className="mx-auto mb-4 text-gray-600" />
                                        <p className="text-gray-400 font-display text-xl mb-4">No orders yet</p>
                                        <Link to="/collections" className="bg-yellow-400 text-black text-xs tracking-widest uppercase px-8 py-3 font-medium hover:bg-yellow-300 transition-colors">
                                            Browse Timepieces
                                        </Link>
                                    </div>
                                ) : (
                                    orders.map(order => (
                                        <div key={order.id} className="bg-zinc-900 border border-white/10 p-5 flex items-center justify-between gap-6 flex-wrap">
                                            <div>
                                                <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-1">{order.orderNumber}</p>
                                                <p className="font-display text-lg text-white">{order.items?.[0]?.productName}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex items-center gap-5">
                        <span className={`text-[10px] tracking-widest uppercase px-3 py-1 border ${
                            order.status === 'CONFIRMED' ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
                        }`}>{order.status}</span>
                                                <span className="font-display text-lg text-yellow-400">{fmt(order.total)}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {tab === 'wishlist' && (
                            wishlist.length === 0
                                ? <div className="text-center py-20"><Heart size={36} className="mx-auto mb-4 text-gray-600" /><p className="text-gray-400">No saved pieces yet</p></div>
                                : <div className="grid grid-cols-2 gap-3">
                                    {wishlist.map(w => (
                                        <Link key={w.id} to={`/watches/${w.id}`} className="bg-zinc-900 border border-white/10 p-4 hover:border-yellow-400/30 transition-colors">
                                            <img src={w.imageUrl || w.image} alt={w.name} className="w-full aspect-square object-cover mb-3" />
                                            <p className="font-display text-sm text-white">{w.name}</p>
                                            <p className="text-yellow-400 text-xs mt-1">{fmt(w.price)}</p>
                                        </Link>
                                    ))}
                                </div>
                        )}

                        {tab === 'profile' && (
                            <div className="bg-zinc-900 border border-white/10 p-8">
                                <h2 className="font-display text-xl text-white mb-8">Profile Information</h2>
                                <div className="space-y-4 max-w-md">
                                    {[['Full Name', user.name], ['Email', user.email]].map(([label, value]) => (
                                        <div key={label}>
                                            <label className="block text-[10px] tracking-widest uppercase text-gray-400 mb-2">{label}</label>
                                            <input defaultValue={value}
                                                   className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 outline-none focus:border-yellow-400/50 transition-colors" />
                                        </div>
                                    ))}
                                    <button className="bg-yellow-400 text-black text-xs tracking-widest uppercase px-6 py-3 font-medium hover:bg-yellow-300 transition-colors mt-2">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}