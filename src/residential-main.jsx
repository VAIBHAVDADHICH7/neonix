import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ResidentialSolarPage from './pages/ResidentialSolarPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResidentialSolarPage />
  </StrictMode>,
)
