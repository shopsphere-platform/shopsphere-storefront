import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-black">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/watches" element={<CollectionsPage />} />
                    <Route path="/watches/:id" element={<ProductDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App