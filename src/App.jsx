import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
      <BrowserRouter>
        <div className="min-h-screen bg-obsidian-900">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <div className="flex items-center justify-center h-screen">
                <h1 className="font-display text-5xl text-gold-400">ShopSphere</h1>
              </div>
            } />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App