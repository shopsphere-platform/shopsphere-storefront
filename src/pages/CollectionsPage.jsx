import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart } from 'lucide-react'
import api from '../utils/api'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const SORTS = [
    { label: 'Featured',          value: 'featured'   },
    { label: 'Price: Low to High', value: 'price_asc'  },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Best Rated',         value: 'rating'     },
]

export default function CollectionsPage() {
    const [watches,  setWatches]  = useState([])
    const [loading,  setLoading]  = useState(true)
    const [category, setCategory] = useState('all')
    const [sort,     setSort]     = useState('featured')
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        setLoading(true)
        const params = new URLSearchParams()
        params.append('size', '20')
        params.append('sort', sort)
        if (category !== 'all') params.append('category', category)

        api.get(`/api/products?${params.toString()}`)
            .then(res => {
                setWatches(res.data.content || res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [category, sort])

    const toggleWishlist = (id) => {
        setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Header */}
            <div className="text-center py-16 border-b border-white/10">
                <p className="text-xs tracking-[0.4em] uppercase text-yellow-400 mb-4">The Complete Collection</p>
                <h1 className="font-display text-5xl text-white">All Timepieces</h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
                    <div className="flex gap-2">
                        {['all', 'mens', 'womens', 'unisex'].map(cat => (
                            <button key={cat} onClick={() => setCategory(cat)}
                                    className={`text-xs tracking-widest uppercase px-5 py-2 transition-colors ${
                                        category === cat
                                            ? 'bg-yellow-400 text-black font-medium'
                                            : 'border border-white/20 text-gray-400 hover:text-white'
                                    }`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{watches.length} pieces</span>
                        <select value={sort} onChange={e => setSort(e.target.value)}
                                className="bg-zinc-900 border border-white/20 text-gray-300 text-xs px-4 py-2 outline-none">
                            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <p className="text-yellow-400 font-display text-2xl">Loading timepieces...</p>
                    </div>
                ) : (
                    /* Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/10">
                        {watches.map(watch => (
                            <div key={watch.id} className="group bg-black hover:bg-zinc-900 transition-colors relative">
                                <Link to={`/watches/${watch.id}`}>
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img src={watch.imageUrl} alt={watch.name}
                                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        {watch.badge && (
                                            <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-3 py-1 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                        {watch.badge}
                      </span>
                                        )}
                                        {/* Hover actions */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <button className="flex-1 bg-yellow-400 text-black text-[10px] tracking-widest uppercase py-2.5 font-medium flex items-center justify-center gap-1 hover:bg-yellow-300">
                                                <ShoppingBag size={11} /> Add to Cart
                                            </button>
                                            <button onClick={(e) => { e.preventDefault(); toggleWishlist(watch.id) }}
                                                    className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                                                        wishlist.includes(watch.id) ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-white/30 text-white'
                                                    }`}>
                                                <Heart size={13} fill={wishlist.includes(watch.id) ? 'currentColor' : 'none'} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-1">{watch.collection}</p>
                                        <h3 className="font-display text-lg text-white group-hover:text-yellow-400 transition-colors">{watch.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{watch.tagline}</p>
                                        <div className="flex items-center justify-between mt-3">
                                            <p className="text-yellow-400 text-sm font-light">{fmt(watch.price)}</p>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400 text-xs">★</span>
                                                <span className="text-xs text-gray-500">{watch.rating} ({watch.reviewCount})</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}