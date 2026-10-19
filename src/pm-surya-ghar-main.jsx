import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PmSuryaGharPage from './pages/PmSuryaGharPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PmSuryaGharPage />
  </StrictMode>,
)
