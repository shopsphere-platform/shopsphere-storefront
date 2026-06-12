import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ── Auth Store ─────────────────────────────────────────
export const useAuthStore = create(
    persist(
        (set) => ({
            user:  null,
            token: null,
            login:  (user, token) => set({ user, token }),
            logout: ()            => set({ user: null, token: null }),
        }),
        { name: 'shopsphere-auth' }
    )
)

// ── Cart Store ─────────────────────────────────────────
export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            drawerOpen: false,
            addItem: (watch, strap = '') => {
                const key = `${watch.id}-${strap}`
                const existing = get().items.find(i => i.key === key)
                if (existing) {
                    set({ items: get().items.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) })
                } else {
                    set({ items: [...get().items, { ...watch, selectedStrap: strap, qty: 1, key, image: watch.imageUrl }] })
                }
            },
            removeItem: (key) => set({ items: get().items.filter(i => i.key !== key) }),
            updateQty:  (key, qty) => qty < 1
                ? set({ items: get().items.filter(i => i.key !== key) })
                : set({ items: get().items.map(i => i.key === key ? { ...i, qty } : i) }),
            clearCart: () => set({ items: [] }),
            total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
        }),
        { name: 'shopsphere-cart' }
    )
)

// ── Wishlist Store ─────────────────────────────────────
export const useWishlistStore = create(
    persist(
        (set, get) => ({
            items: [],
            toggle: (watch) => {
                const exists = get().items.find(i => i.id === watch.id)
                set({ items: exists
                        ? get().items.filter(i => i.id !== watch.id)
                        : [...get().items, watch]
                })
            },
            has: (id) => get().items.some(i => i.id === id),
        }),
        { name: 'shopsphere-wishlist' }
    )
)