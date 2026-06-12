import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import CheckoutPage from './pages/CheckoutPage'
import AccountPage from './pages/AccountPage'

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-black">
                <Navbar />
                <CartDrawer />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/watches" element={<CollectionsPage />} />
                    <Route path="/watches/:id" element={<ProductDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
