import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Award, Clock, Globe } from 'lucide-react'

const watches = [
    { id: 1, name: 'Helix Noir', collection: 'Noir Series', price: 48500, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80', tagline: 'Tourbillon · Perpetual Calendar' },
    { id: 2, name: 'Solaris Blanc', collection: 'Solar Series', price: 22800, badge: 'New', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80', tagline: 'Chronograph · GMT' },
    { id: 3, name: 'Depth Master', collection: 'Aquanaut Series', price: 15200, badge: 'Limited', image: 'https://images.unsplash.com/photo-1594576722512-582bcd85b524?w=600&q=80', tagline: 'Diver · 500m' },
    { id: 4, name: 'Empress Rose', collection: 'Empress Series', price: 38900, badge: 'Exclusive', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80', tagline: 'Diamond Bezel · Moon Phase' },
]

const collections = [
    { id: 1, name: 'Noir Series', tagline: 'Darkness, refined', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80' },
    { id: 2, name: 'Aquanaut Series', tagline: 'Born in the deep', image: 'https://images.unsplash.com/photo-1594576722512-582bcd85b524?w=800&q=80' },
    { id: 3, name: 'Empress Series', tagline: 'For those who command', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80' },
]

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function HomePage() {
    return (
        <main>
            {/* ── Hero ── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=1800&q=90" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/65" />
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <p className="text-xs tracking-[0.4em] uppercase text-yellow-400 mb-6">Est. Geneva · Maison ShopSphere</p>
                    <h1 className="font-display text-5xl md:text-7xl font-normal text-white mb-6 leading-tight">
                        Time is the only <br /><span className="text-yellow-400 italic">true luxury</span>
                    </h1>
                    <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto font-light">
                        Singular timepieces crafted by masters. Each movement a declaration of the extraordinary.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/collections" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-yellow-300 transition-colors">
                            Explore Collection <ArrowRight size={14} />
                        </Link>
                        <Link to="/about" className="inline-flex items-center gap-2 border border-yellow-400 text-yellow-400 px-8 py-3 text-sm tracking-widest uppercase hover:bg-yellow-400/10 transition-colors">
                            Our Story
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-xs tracking-widest uppercase text-gray-400">Scroll</span>
                    <div className="w-px h-8 bg-yellow-400/50" />
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="py-20 border-y border-white/10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
                    {[['8', 'Exclusive References'], ['43', 'Artisan Partners'], ['2,800+', 'Collectors Worldwide']].map(([num, label]) => (
                        <div key={label}>
                            <p className="font-display text-4xl md:text-5xl text-yellow-400 mb-2">{num}</p>
                            <p className="text-xs tracking-widest uppercase text-gray-400">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Featured Watches ── */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-xs tracking-[0.3em] uppercase text-yellow-400 mb-3">Curated Selection</p>
                            <h2 className="font-display text-4xl text-white">Signature Pieces</h2>
                        </div>
                        <Link to="/collections" className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors tracking-wider uppercase">
                            View all <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
                        {watches.map(watch => (
                            <Link key={watch.id} to={`/watches/${watch.id}`} className="group bg-black hover:bg-zinc-900 transition-colors">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img src={watch.image} alt={watch.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    {watch.badge && (
                                        <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-3 py-1 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                      {watch.badge}
                    </span>
                                    )}
                                </div>
                                <div className="p-5">
                                    <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-1">{watch.collection}</p>
                                    <h3 className="font-display text-lg text-white group-hover:text-yellow-400 transition-colors">{watch.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{watch.tagline}</p>
                                    <p className="text-yellow-400 mt-3 text-sm font-light">{fmt(watch.price)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Collections ── */}
            <section className="py-20 px-6 bg-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xs tracking-[0.3em] uppercase text-yellow-400 mb-3">Explore</p>
                        <h2 className="font-display text-4xl text-white">Collections</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                        {collections.map(col => (
                            <Link key={col.id} to="/collections" className="group relative overflow-hidden aspect-[3/4] block">
                                <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <p className="text-[10px] tracking-widest uppercase text-yellow-400 mb-2">{col.tagline}</p>
                                    <h3 className="font-display text-2xl text-white mb-4">{col.name}</h3>
                                    <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gray-300 group-hover:text-yellow-400 transition-colors">
                    Discover <ArrowRight size={12} />
                  </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Us ── */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs tracking-[0.3em] uppercase text-yellow-400 mb-3">The Promise</p>
                        <h2 className="font-display text-4xl text-white">Every detail, considered</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Award,  title: 'Certified Authentic', body: 'Every piece authenticated by independent horologists before listing.' },
                            { icon: Shield, title: 'Two-Year Warranty',   body: 'All movements warranted against defect for 24 months.' },
                            { icon: Clock,  title: 'White-Glove Service', body: 'Personal timepiece consultants available via private appointment.' },
                            { icon: Globe,  title: 'Insured Shipping',    body: 'Fully insured delivery to 190+ countries worldwide.' },
                        ].map(({ icon: Icon, title, body }) => (
                            <div key={title} className="text-center">
                                <div className="w-12 h-12 border border-yellow-400/30 flex items-center justify-center mx-auto mb-5">
                                    <Icon size={20} className="text-yellow-400" />
                                </div>
                                <h3 className="text-sm font-medium text-white mb-2 tracking-wide">{title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Newsletter ── */}
            <section className="py-20 px-6 bg-zinc-900 border-t border-white/10">
                <div className="max-w-xl mx-auto text-center">
                    <p className="text-xs tracking-[0.3em] uppercase text-yellow-400 mb-4">Inner Circle</p>
                    <h2 className="font-display text-3xl text-white mb-4">Access before the world</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">Private previews, collector events, and notes from our workshops.</p>
                    <div className="flex gap-0">
                        <input type="email" placeholder="Your email address" className="flex-1 bg-black border border-white/20 text-white text-sm px-5 py-3 outline-none focus:border-yellow-400/50 transition-colors placeholder:text-gray-600" />
                        <button className="bg-yellow-400 text-black text-xs tracking-widest uppercase px-6 font-medium hover:bg-yellow-300 transition-colors">Join</button>
                    </div>
                </div>
            </section>
        </main>
    )
}