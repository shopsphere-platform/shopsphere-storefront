import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCartStore, useAuthStore } from '../store'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { items } = useCartStore()
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const count = items.reduce((s, i) => s + i.qty, 0)

    const links = ['Collections', 'About']

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <Link to="/" className="font-display text-2xl text-yellow-400 tracking-[0.2em]">
                    SHOPSPHERE
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    {links.map(link => (
                        <Link key={link} to={`/${link.toLowerCase()}`}
                              className="text-xs tracking-[0.2em] uppercase text-gray-300 hover:text-yellow-400 transition-colors">
                            {link}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-5">
                    <button onClick={() => navigate(user ? '/account' : '/auth')}
                            className="text-gray-300 hover:text-yellow-400 transition-colors">
                        <User size={19} />
                    </button>
                    <button onClick={() => useCartStore.setState({ drawerOpen: true })}
                            className="relative text-gray-300 hover:text-yellow-400 transition-colors">
                        <ShoppingBag size={19} />
                        {count > 0 && (
                            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-yellow-400 text-black text-[10px] flex items-center justify-center font-semibold">
                                {count}
                            </span>
                        )}
                    </button>
                    <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 flex flex-col gap-4">
                    {links.map(link => (
                        <Link key={link} to={`/${link.toLowerCase()}`}
                              className="text-xs tracking-[0.2em] uppercase text-gray-300 hover:text-yellow-400 transition-colors"
                              onClick={() => setMenuOpen(false)}>
                            {link}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}
