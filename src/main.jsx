import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style/index.scss'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>
)
