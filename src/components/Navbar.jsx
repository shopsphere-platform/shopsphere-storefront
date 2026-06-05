import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian-900/95 backdrop-blur border-b border-obsidian-700">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                <Link to="/" className="font-display text-xl text-gold-400 tracking-widest">
                    SHOPSPHERE
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {['Collections', 'Watches', 'About'].map(link => (
                        <Link key={link} to={`/${link.toLowerCase()}`}
                              className="text-cream-300 hover:text-gold-400 transition-colors text-sm tracking-wider uppercase">
                            {link}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-cream-300 hover:text-gold-400 transition-colors"><Search size={18} /></button>
                    <button className="text-cream-300 hover:text-gold-400 transition-colors"><Heart size={18} /></button>
                    <button className="text-cream-300 hover:text-gold-400 transition-colors"><ShoppingBag size={18} /></button>
                    <button className="md:hidden text-cream-300" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-obsidian-800 border-t border-obsidian-700 px-6 py-4 flex flex-col gap-4">
                    {['Collections', 'Watches', 'About'].map(link => (
                        <Link key={link} to={`/${link.toLowerCase()}`}
                              className="text-cream-300 hover:text-gold-400 text-sm tracking-wider uppercase"
                              onClick={() => setMenuOpen(false)}>
                            {link}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}