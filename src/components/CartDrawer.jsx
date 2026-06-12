import { Link } from 'react-router-dom'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function CartDrawer() {
    const { items, drawerOpen, updateQty, removeItem, total } = useCartStore()
    const close = () => useCartStore.setState({ drawerOpen: false })

    if (!drawerOpen) return null

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            <div className="absolute inset-0 bg-black/60" onClick={close} />
            <div className="relative w-full max-w-md bg-zinc-950 border-l border-white/10 h-full flex flex-col animate-fade-in">
                <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
                    <h2 className="font-display text-xl text-white">Your Bag</h2>
                    <button onClick={close} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                        <ShoppingBag size={32} className="text-gray-600 mb-4" />
                        <p className="text-gray-400 text-sm mb-6">Your bag is empty</p>
                        <Link to="/collections" onClick={close}
                              className="bg-yellow-400 text-black text-xs tracking-widest uppercase px-6 py-3 font-medium hover:bg-yellow-300 transition-colors">
                            Browse Timepieces
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                            {items.map(item => (
                                <div key={item.key} className="flex gap-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover flex-shrink-0 bg-zinc-900" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] tracking-widest uppercase text-gray-500">{item.collection}</p>
                                        <p className="font-display text-base text-white truncate">{item.name}</p>
                                        {item.selectedStrap && <p className="text-xs text-gray-500 mt-0.5">{item.selectedStrap}</p>}
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center border border-white/15">
                                                <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                                    <Minus size={11} />
                                                </button>
                                                <span className="w-8 text-center text-xs text-white">{item.qty}</span>
                                                <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                                    <Plus size={11} />
                                                </button>
                                            </div>
                                            <span className="text-yellow-400 text-sm">{fmt(item.price * item.qty)}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => removeItem(item.key)} className="text-gray-600 hover:text-red-400 transition-colors self-start">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 p-6 space-y-4">
                            <div className="flex justify-between font-display text-lg">
                                <span className="text-white">Subtotal</span>
                                <span className="text-yellow-400">{fmt(total())}</span>
                            </div>
                            <Link to="/checkout" onClick={close}
                                  className="block text-center bg-yellow-400 text-black text-xs tracking-widest uppercase py-3.5 font-medium hover:bg-yellow-300 transition-colors">
                                Checkout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
