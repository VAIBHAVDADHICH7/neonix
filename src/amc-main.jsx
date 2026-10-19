import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SolarAmcPage from './pages/SolarAmcPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SolarAmcPage />
  </StrictMode>,
)
