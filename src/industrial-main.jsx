import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import IndustrialSolarPage from './pages/IndustrialSolarPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IndustrialSolarPage />
  </StrictMode>,
)
