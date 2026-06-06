import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Hero */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1800&q=90" alt="About" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/65" />
                <div className="relative text-center px-6">
                    <p className="text-xs tracking-[0.4em] uppercase text-yellow-400 mb-4">Maison ShopSphere</p>
                    <h1 className="font-display text-5xl text-white">Our Story</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-20">
                {/* Quote */}
                <div className="text-center mb-20">
                    <p className="font-display text-2xl text-yellow-400 italic mb-8">
                        "We do not sell watches. We connect collectors with the rarest expressions of human ingenuity."
                    </p>
                    <div className="w-12 h-px bg-yellow-400/60 mx-auto mb-10" />
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
                        Founded with a singular mission — to create the world's most trusted platform for extraordinary timepieces — ShopSphere works with a carefully curated network of master watchmakers and established collectors across 40 countries.
                    </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {[
                        { num: '01', title: 'Authentication First', body: 'Every timepiece evaluated by independent WOSTEP-certified horologists. Only pieces passing our 47-point inspection are listed.' },
                        { num: '02', title: 'Collector Network', body: 'Our 43 artisan partners represent watchmakers with a combined 800+ years of Swiss horological experience.' },
                        { num: '03', title: 'Transparent Provenance', body: 'Full documentation — service records, box and papers, ownership history — provided for every reference.' },
                        { num: '04', title: 'Lifetime Relationship', body: 'Every purchase opens a dedicated relationship with your personal timepiece consultant.' },
                    ].map(v => (
                        <div key={v.num} className="border border-white/10 p-8 hover:border-yellow-400/30 transition-colors">
                            <p className="font-display text-3xl text-yellow-400/30 mb-4">{v.num}</p>
                            <h3 className="text-sm font-medium text-white mb-3 tracking-wide">{v.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{v.body}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center border-t border-white/10 pt-16">
                    <p className="text-xs tracking-widest uppercase text-yellow-400 mb-6">Begin Your Journey</p>
                    <h2 className="font-display text-4xl text-white mb-8">Find your signature timepiece</h2>
                    <Link to="/collections" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-yellow-300 transition-colors">
                        Explore Collection <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    )
}