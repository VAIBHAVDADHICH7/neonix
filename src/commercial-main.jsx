import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CommercialSolarPage from './pages/CommercialSolarPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CommercialSolarPage />
  </StrictMode>,
)
