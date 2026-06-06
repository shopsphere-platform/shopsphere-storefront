import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Heart, ArrowLeft, Shield, Award } from 'lucide-react'

const watches = [
    { id: 1, name: 'Helix Noir', collection: 'Noir Series', price: 48500, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80', tagline: 'Tourbillon · Perpetual Calendar', rating: 4.9, reviews: 84, movement: 'Manual-wind Tourbillon', caseMaterial: 'Grade 5 Titanium', crystal: 'Sapphire anti-reflective', waterResistance: '100m', diameter: '42mm', powerReserve: '72 hours', straps: ['Black Alligator', 'Black Rubber', 'Titanium Bracelet'], description: 'The Helix Noir represents the apex of horological engineering. A flying tourbillon at 6 o\'clock compensates for gravitational error while the perpetual calendar mechanism accounts for every month\'s variation through 2100 without manual adjustment.' },
    { id: 2, name: 'Solaris Blanc', collection: 'Solar Series', price: 22800, badge: 'New', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80', tagline: 'Chronograph · GMT', rating: 4.8, reviews: 127, movement: 'Self-winding Chronograph', caseMaterial: '18k White Gold', crystal: 'Double-domed sapphire', waterResistance: '50m', diameter: '39mm', powerReserve: '68 hours', straps: ['White Satin', 'Silver Bracelet'], description: 'A masterpiece in 18k white gold, the Solaris Blanc marries a high-frequency chronograph with a GMT complication.' },
    { id: 3, name: 'Depth Master', collection: 'Aquanaut Series', price: 15200, badge: 'Limited', image: 'https://images.unsplash.com/photo-1594576722512-582bcd85b524?w=800&q=80', tagline: 'Diver · 500m', rating: 4.7, reviews: 203, movement: 'Automatic COSC-certified', caseMaterial: 'PVD Steel', crystal: 'Sapphire with luminescent coating', waterResistance: '500m', diameter: '44mm', powerReserve: '70 hours', straps: ['Blue Rubber', 'Steel Bracelet'], description: 'Engineered for the deep, tested to 500 meters.' },
    { id: 4, name: 'Empress Rose', collection: 'Empress Series', price: 38900, badge: 'Exclusive', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80', tagline: 'Diamond Bezel · Moon Phase', rating: 5.0, reviews: 41, movement: 'Self-winding moon phase', caseMaterial: '18k Rose Gold', crystal: 'Sapphire anti-reflective both sides', waterResistance: '30m', diameter: '34mm', powerReserve: '55 hours', straps: ['Blush Alligator', 'Rose Gold Bracelet'], description: 'The Empress Rose is adorned with 96 VS-clarity diamonds set by hand on the bezel.' },
    { id: 5, name: 'Aether Grand', collection: 'Grand Complication', price: 125000, badge: 'Collector', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80', tagline: 'Minute Repeater · Perpetual', rating: 5.0, reviews: 12, movement: 'Hand-wound Grand Complication', caseMaterial: 'Platinum 950', crystal: 'Flat sapphire', waterResistance: '30m', diameter: '43mm', powerReserve: '50 hours', straps: ['Grey Alligator', 'Platinum Bracelet'], description: 'Among the most complex wristwatches ever produced.' },
    { id: 6, name: 'Meridian GMT', collection: 'Meridian Series', price: 18400, badge: 'New', image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80', tagline: 'World Timer · 24 Cities', rating: 4.7, reviews: 156, movement: 'Self-winding World Timer', caseMaterial: 'Stainless steel', crystal: 'Sapphire anti-reflective', waterResistance: '100m', diameter: '40mm', powerReserve: '65 hours', straps: ['Navy Blue Alligator', 'Steel Bracelet'], description: 'Designed for those who conduct business across continents.' },
    { id: 7, name: 'Veldt Chrono', collection: 'Adventure Series', price: 9800, badge: null, image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&q=80', tagline: 'Flyback Chronograph', rating: 4.6, reviews: 318, movement: 'Automatic flyback chronograph', caseMaterial: 'DLC-coated steel', crystal: 'Hardened mineral glass', waterResistance: '200m', diameter: '41mm', powerReserve: '48 hours', straps: ['Khaki Canvas', 'Brown Leather', 'Steel Bracelet'], description: 'Born from military specification, built to perform.' },
    { id: 8, name: 'Zenith Pavé', collection: 'Zenith Series', price: 67500, badge: 'Exclusive', image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80', tagline: 'Full Pavé Diamond', rating: 4.9, reviews: 28, movement: 'Swiss quartz ultra-thin', caseMaterial: '18k Yellow Gold', crystal: 'Sapphire', waterResistance: '30m', diameter: '32mm', powerReserve: '36 months', straps: ['Diamond Bracelet'], description: 'Every surface encrusted with brilliant-cut diamonds.' },
]

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function ProductDetailPage() {
    const { id } = useParams()
    const watch = watches.find(w => w.id === Number(id))
    const [selectedStrap, setSelectedStrap] = useState(0)
    const [qty, setQty] = useState(1)
    const [wished, setWished] = useState(false)
    const [tab, setTab] = useState('story')
    const [added, setAdded] = useState(false)

    if (!watch) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-400 text-xl mb-6">Watch not found</p>
                <Link to="/collections" className="text-yellow-400 hover:underline">Back to Collections</Link>
            </div>
        </div>
    )

    const related = watches.filter(w => w.id !== watch.id).slice(0, 3)

    const handleAddToCart = () => {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Back */}
                <Link to="/collections" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400 hover:text-yellow-400 transition-colors mb-10">
                    <ArrowLeft size={12} /> Back to Collections
                </Link>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

                    {/* Image */}
                    <div className="relative aspect-square bg-zinc-900 overflow-hidden">
                        <img src={watch.image} alt={watch.name} className="w-full h-full object-cover" />
                        {watch.badge && (
                            <span className="absolute top-6 left-6 text-[10px] tracking-widest uppercase px-4 py-1.5 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                {watch.badge}
              </span>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <p className="text-xs tracking-widest uppercase text-yellow-400 mb-3">{watch.collection}</p>
                        <h1 className="font-display text-5xl text-white mb-2">{watch.name}</h1>
                        <p className="text-gray-400 tracking-wider text-sm mb-6">{watch.tagline}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-sm ${i < Math.floor(watch.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                                ))}
                            </div>
                            <span className="text-xs text-gray-400">{watch.rating} · {watch.reviews} reviews</span>
                        </div>

                        {/* Price */}
                        <p className="font-display text-4xl text-yellow-400 mb-8">{fmt(watch.price)}</p>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-3 mb-8 p-5 bg-zinc-900 border border-white/10">
                            {[
                                ['Movement', watch.movement],
                                ['Case', watch.caseMaterial],
                                ['Diameter', watch.diameter],
                                ['Water Res.', watch.waterResistance],
                                ['Crystal', watch.crystal],
                                ['Power Reserve', watch.powerReserve],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <p className="text-[9px] tracking-widest uppercase text-yellow-400/60 mb-0.5">{label}</p>
                                    <p className="text-xs text-gray-300 font-light">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Strap selector */}
                        <div className="mb-6">
                            <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Strap / Bracelet</p>
                            <div className="flex flex-wrap gap-2">
                                {watch.straps.map((strap, i) => (
                                    <button key={strap} onClick={() => setSelectedStrap(i)}
                                            className={`text-xs px-4 py-2 transition-colors ${
                                                selectedStrap === i ? 'bg-yellow-400 text-black font-medium' : 'border border-white/20 text-gray-400 hover:border-white/40'
                                            }`}>
                                        {strap}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Qty + Cart */}
                        <div className="flex gap-3 mb-5">
                            <div className="flex items-center border border-white/20 h-12">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 text-gray-400 hover:text-white text-xl">−</button>
                                <span className="w-10 text-center text-sm text-white">{qty}</span>
                                <button onClick={() => setQty(q => q + 1)} className="w-10 text-gray-400 hover:text-white text-xl">+</button>
                            </div>
                            <button onClick={handleAddToCart}
                                    className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium tracking-widest uppercase transition-colors ${
                                        added ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black hover:bg-yellow-300'
                                    }`}>
                                <ShoppingBag size={15} />
                                {added ? 'Added to Cart!' : 'Add to Cart'}
                            </button>
                            <button onClick={() => setWished(w => !w)}
                                    className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                                        wished ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-white/20 text-white hover:border-yellow-400'
                                    }`}>
                                <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-2 gap-3">
                            {[[Shield, 'Authenticated'], [Award, 'Warranted 2 Years']].map(([Icon, label]) => (
                                <div key={label} className="flex items-center gap-2 p-3 border border-white/10 bg-zinc-900">
                                    <Icon size={14} className="text-yellow-400/70" />
                                    <span className="text-[10px] tracking-widest uppercase text-gray-400">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tabs */}
                        <div className="mt-10 border-t border-white/10 pt-8">
                            <div className="flex gap-6 border-b border-white/10 mb-6">
                                {[['story', 'The Story'], ['specs', 'Full Specs']].map(([key, label]) => (
                                    <button key={key} onClick={() => setTab(key)}
                                            className={`pb-4 text-xs tracking-widest uppercase transition-colors ${
                                                tab === key ? 'text-yellow-400 border-b border-yellow-400' : 'text-gray-500 hover:text-gray-300'
                                            }`}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                            {tab === 'story' && <p className="text-gray-400 text-sm leading-relaxed font-light">{watch.description}</p>}
                            {tab === 'specs' && (
                                <div className="space-y-2">
                                    {[['Movement', watch.movement], ['Case Material', watch.caseMaterial], ['Crystal', watch.crystal], ['Water Resistance', watch.waterResistance], ['Diameter', watch.diameter], ['Power Reserve', watch.powerReserve], ['Available Straps', watch.straps.join(', ')]].map(([k, v]) => (
                                        <div key={k} className="flex justify-between py-2 border-b border-white/5 text-sm">
                                            <span className="text-gray-500 font-light">{k}</span>
                                            <span className="text-gray-300 font-light text-right max-w-[60%]">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related */}
                <div className="border-t border-white/10 pt-16">
                    <div className="text-center mb-10">
                        <p className="text-xs tracking-widest uppercase text-yellow-400 mb-3">You May Also Like</p>
                        <h2 className="font-display text-3xl text-white">Related Timepieces</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10">
                        {related.map(w => (
                            <Link key={w.id} to={`/watches/${w.id}`} className="group bg-black hover:bg-zinc-900 transition-colors">
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img src={w.image} alt={w.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-5">
                                    <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-1">{w.collection}</p>
                                    <h3 className="font-display text-lg text-white group-hover:text-yellow-400 transition-colors">{w.name}</h3>
                                    <p className="text-yellow-400 mt-2 text-sm">{fmt(w.price)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
