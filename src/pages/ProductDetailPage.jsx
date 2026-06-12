import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Heart, Star, Shield, Truck, RotateCcw } from 'lucide-react'
import { useCartStore, useWishlistStore } from '../store'
import api from '../utils/api'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function ProductDetailPage() {
    const { id } = useParams()
    const [watch, setWatch] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedStrap, setSelectedStrap] = useState('')
    const [qty, setQty] = useState(1)
    const [added, setAdded] = useState(false)

    const { addItem } = useCartStore()
    const { toggle, has } = useWishlistStore()

    useEffect(() => {
        setLoading(true)
        api.get(`/api/products/${id}`)
            .then(res => {
                setWatch(res.data)
                const straps = res.data.straps ? res.data.straps.split(',') : []
                setSelectedStrap(straps[0] || '')
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [id])

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center pt-20">
            <p className="text-yellow-400 font-display text-2xl">Loading...</p>
        </div>
    )

    if (!watch) return (
        <div className="min-h-screen bg-black flex items-center justify-center pt-20">
            <div className="text-center">
                <p className="text-gray-400 text-xl mb-6 font-display">Watch not found</p>
                <Link to="/collections" className="bg-yellow-400 text-black text-xs tracking-widest uppercase px-8 py-3 font-medium hover:bg-yellow-300 transition-colors">
                    Browse Collection
                </Link>
            </div>
        </div>
    )

    const straps = watch.straps ? watch.straps.split(',') : []

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) addItem(watch, selectedStrap)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const specs = [
        ['Movement',        watch.movement],
        ['Case Material',   watch.caseMaterial],
        ['Crystal',         watch.crystal],
        ['Water Resistance', watch.waterResistance],
        ['Diameter',        watch.diameter],
        ['Power Reserve',   watch.powerReserve],
    ].filter(([, v]) => v)

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
                    <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/collections" className="hover:text-yellow-400 transition-colors">Collections</Link>
                    <span>/</span>
                    <span className="text-gray-300">{watch.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-zinc-900">
                        <img src={watch.imageUrl} alt={watch.name} className="w-full h-full object-cover" />
                        {watch.badge && (
                            <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase px-3 py-1.5 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                {watch.badge}
              </span>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-2">{watch.collection}</p>
                        <h1 className="font-display text-4xl text-white mb-3">{watch.name}</h1>
                        <p className="text-gray-400 text-sm mb-4">{watch.tagline}</p>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={14} className={i <= Math.round(watch.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'} />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">{watch.rating} ({watch.reviewCount} reviews)</span>
                        </div>

                        <p className="font-display text-3xl text-yellow-400 mb-6">{fmt(watch.price)}</p>

                        <p className="text-gray-400 text-sm leading-relaxed mb-8">{watch.description}</p>

                        {/* Strap selector */}
                        {straps.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-[10px] tracking-widest uppercase text-gray-400 mb-3">Strap Option</label>
                                <div className="flex flex-wrap gap-2">
                                    {straps.map(strap => (
                                        <button key={strap} onClick={() => setSelectedStrap(strap)}
                                                className={`text-xs px-4 py-2 border transition-colors ${
                                                    selectedStrap === strap ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' : 'border-white/20 text-gray-400 hover:border-white/40'
                                                }`}>
                                            {strap.trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Qty + Add to cart */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center border border-white/20">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-12 text-gray-400 hover:text-white transition-colors">−</button>
                                <span className="w-12 text-center text-white text-sm">{qty}</span>
                                <button onClick={() => setQty(q => q + 1)} className="w-10 h-12 text-gray-400 hover:text-white transition-colors">+</button>
                            </div>
                            <button onClick={handleAddToCart}
                                    className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black text-xs tracking-widest uppercase py-3.5 font-medium hover:bg-yellow-300 transition-colors">
                                <ShoppingBag size={14} /> {added ? 'Added!' : 'Add to Cart'}
                            </button>
                            <button onClick={() => toggle(watch)}
                                    className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                                        has(watch.id) ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-white/20 text-white hover:border-white/40'
                                    }`}>
                                <Heart size={16} fill={has(watch.id) ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-4 py-6 border-t border-white/10 mb-8">
                            {[
                                [Shield,     'Authenticated'],
                                [Truck,      'Insured Shipping'],
                                [RotateCcw,  '30-Day Returns'],
                            ].map(([Icon, label]) => (
                                <div key={label} className="text-center">
                                    <Icon size={18} className="text-yellow-400 mx-auto mb-2" />
                                    <p className="text-[10px] tracking-widest uppercase text-gray-500">{label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Specs */}
                        {specs.length > 0 && (
                            <div>
                                <h3 className="font-display text-lg text-white mb-4">Specifications</h3>
                                <div className="space-y-2">
                                    {specs.map(([label, value]) => (
                                        <div key={label} className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">{label}</span>
                                            <span className="text-gray-300">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}