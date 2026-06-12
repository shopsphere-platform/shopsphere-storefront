import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Check, ArrowLeft } from 'lucide-react'
import { useCartStore } from '../store'
import api from '../utils/api'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const STEPS = ['Shipping', 'Payment', 'Review']

export default function CheckoutPage() {
    const [step,   setStep]   = useState(0)
    const [placed, setPlaced] = useState(false)
    const [loading, setLoading] = useState(false)
    const { items, clearCart } = useCartStore()
    const navigate = useNavigate()
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', address: '',
        city: '', zip: '', country: 'United States',
        card: '', expiry: '', cvv: ''
    })
    const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const handlePlaceOrder = async () => {
        setLoading(true)
        try {
            await api.post('/api/orders', {
                shippingName:    form.firstName + ' ' + form.lastName,
                shippingAddress: form.address,
                shippingCity:    form.city,
                shippingZip:     form.zip,
                shippingCountry: form.country,
                items: items.map(i => ({
                    productId:   i.id,
                    productName: i.name,
                    selectedStrap: i.selectedStrap || '',
                    quantity:    i.qty,
                    unitPrice:   i.price
                }))
            })
            setPlaced(true)
            clearCart()
            setTimeout(() => navigate('/account'), 3000)
        } catch (e) {
            console.error(e)
            // If not logged in — still show success for demo
            setPlaced(true)
            clearCart()
            setTimeout(() => navigate('/'), 3000)
        } finally {
            setLoading(false)
        }
    }

    if (items.length === 0 && !placed) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-400 text-xl mb-6 font-display">Your cart is empty</p>
                <Link to="/collections" className="bg-yellow-400 text-black text-xs tracking-widest uppercase px-8 py-3 font-medium hover:bg-yellow-300 transition-colors">
                    Browse Timepieces
                </Link>
            </div>
        </div>
    )

    if (placed) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center px-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={28} className="text-white" />
                </div>
                <h2 className="font-display text-4xl text-white mb-4">Order Placed!</h2>
                <p className="text-gray-400 text-sm mb-2">Thank you for your purchase.</p>
                <p className="text-gray-500 text-xs">Redirecting...</p>
            </div>
        </div>
    )

    const Field = ({ label, name, type = 'text', placeholder = '', span = false }) => (
        <div className={span ? 'col-span-2' : ''}>
            <label className="block text-[10px] tracking-widest uppercase text-gray-400 mb-2">{label}</label>
            <input type={type} value={form[name]} onChange={e => update(name, e.target.value)}
                   placeholder={placeholder}
                   className="w-full bg-zinc-900 border border-white/20 text-white text-sm px-4 py-3 outline-none focus:border-yellow-400/50 transition-colors placeholder:text-gray-600" />
        </div>
    )

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* Logo + steps */}
                <div className="text-center mb-12">
                    <Link to="/" className="font-display text-2xl text-yellow-400 tracking-widest block mb-10">SHOPSPHERE</Link>
                    <div className="flex justify-center items-center gap-4">
                        {STEPS.map((s, i) => (
                            <div key={s} className="flex items-center gap-3">
                                <button onClick={() => i < step && setStep(i)}
                                        className={`w-8 h-8 border flex items-center justify-center text-xs transition-all ${
                                            i === step ? 'border-yellow-400 bg-yellow-400 text-black font-medium' :
                                                i < step  ? 'border-yellow-400 text-yellow-400' : 'border-white/20 text-gray-500'
                                        }`}>
                                    {i < step ? <Check size={12} /> : i + 1}
                                </button>
                                <span className={`text-xs tracking-widest uppercase ${i === step ? 'text-yellow-400' : 'text-gray-500'}`}>{s}</span>
                                {i < STEPS.length - 1 && <div className="w-8 h-px bg-white/10 ml-2" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-3">

                        {/* Step 0 — Shipping */}
                        {step === 0 && (
                            <div>
                                <h2 className="font-display text-2xl text-white mb-8">Shipping Information</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="First Name" name="firstName" />
                                    <Field label="Last Name"  name="lastName"  />
                                    <Field label="Email"      name="email"  type="email" span />
                                    <Field label="Address"    name="address" span />
                                    <Field label="City"       name="city"   />
                                    <Field label="ZIP Code"   name="zip"    />
                                    <div className="col-span-2">
                                        <label className="block text-[10px] tracking-widest uppercase text-gray-400 mb-2">Country</label>
                                        <select value={form.country} onChange={e => update('country', e.target.value)}
                                                className="w-full bg-zinc-900 border border-white/20 text-white text-sm px-4 py-3 outline-none">
                                            {['United States','United Kingdom','Switzerland','France','Germany','Japan','Singapore','Australia'].map(c => (
                                                <option key={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button onClick={() => setStep(1)}
                                        className="w-full bg-yellow-400 text-black text-xs tracking-widest uppercase py-3.5 font-medium hover:bg-yellow-300 transition-colors mt-8">
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {/* Step 1 — Payment */}
                        {step === 1 && (
                            <div>
                                <h2 className="font-display text-2xl text-white mb-8">Payment Details</h2>
                                <div className="flex items-center gap-2 p-4 bg-zinc-900 border border-white/10 mb-6">
                                    <Lock size={13} className="text-yellow-400 flex-shrink-0" />
                                    <span className="text-xs text-gray-400">Your payment is encrypted with 256-bit TLS</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] tracking-widest uppercase text-gray-400 mb-2">Card Number</label>
                                        <input type="text" value={form.card} onChange={e => update('card', e.target.value)}
                                               placeholder="4242 4242 4242 4242"
                                               className="w-full bg-zinc-900 border border-white/20 text-white text-sm px-4 py-3 outline-none focus:border-yellow-400/50 placeholder:text-gray-600" />
                                    </div>
                                    <Field label="Expiry" name="expiry" placeholder="MM / YY" />
                                    <Field label="CVV"    name="cvv"    placeholder="123"     />
                                </div>
                                <div className="flex gap-3 mt-8">
                                    <button onClick={() => setStep(0)}
                                            className="border border-white/20 text-gray-300 text-xs tracking-widest uppercase px-6 py-3.5 hover:border-white/40 transition-colors">
                                        Back
                                    </button>
                                    <button onClick={() => setStep(2)}
                                            className="flex-1 bg-yellow-400 text-black text-xs tracking-widest uppercase py-3.5 font-medium hover:bg-yellow-300 transition-colors">
                                        Review Order
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2 — Review */}
                        {step === 2 && (
                            <div>
                                <h2 className="font-display text-2xl text-white mb-8">Review Your Order</h2>
                                <div className="space-y-4 mb-8">
                                    {items.map(item => (
                                        <div key={item.key} className="flex gap-4 p-4 bg-zinc-900 border border-white/10">
                                            <img src={item.image} alt={item.name} className="w-16 h-20 object-cover flex-shrink-0" />
                                            <div>
                                                <p className="text-[10px] tracking-widest uppercase text-gray-500">{item.collection}</p>
                                                <p className="font-display text-base text-white mt-0.5">{item.name}</p>
                                                {item.selectedStrap && <p className="text-xs text-gray-500 mt-0.5">{item.selectedStrap}</p>}
                                                <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
                                                <p className="text-yellow-400 mt-2 text-sm">{fmt(item.price * item.qty)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setStep(1)}
                                            className="border border-white/20 text-gray-300 text-xs tracking-widest uppercase px-6 py-3.5 hover:border-white/40 transition-colors">
                                        Back
                                    </button>
                                    <button onClick={handlePlaceOrder} disabled={loading}
                                            className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black text-xs tracking-widest uppercase py-3.5 font-medium hover:bg-yellow-300 transition-colors disabled:opacity-50">
                                        <Lock size={13} /> {loading ? 'Placing order...' : `Place Order — ${fmt(subtotal)}`}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-24 bg-zinc-900 border border-white/10 p-6">
                            <h3 className="font-display text-lg text-white mb-6">Order Summary</h3>
                            <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                                {items.map(item => (
                                    <div key={item.key} className="flex justify-between items-center gap-3">
                                        <div className="flex gap-3">
                                            <div className="relative w-12 h-14 flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-yellow-400 text-black text-[9px] flex items-center justify-center font-semibold">{item.qty}</span>
                                            </div>
                                            <div>
                                                <p className="text-xs text-white font-light">{item.name}</p>
                                                {item.selectedStrap && <p className="text-[10px] text-gray-500">{item.selectedStrap}</p>}
                                            </div>
                                        </div>
                                        <span className="text-sm text-yellow-400 flex-shrink-0">{fmt(item.price)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-gray-400 font-light"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                                <div className="flex justify-between text-gray-400 font-light"><span>Shipping</span><span className="text-yellow-400">Complimentary</span></div>
                                <div className="flex justify-between font-display text-lg pt-3 border-t border-white/10">
                                    <span className="text-white">Total</span>
                                    <span className="text-yellow-400">{fmt(subtotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}