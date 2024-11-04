import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './components/Context/AuthContext/AuthContext.jsx'
import { DonnerProvider } from './components/Context/DonnerContext/DonnerContext.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DonnerProvider>
        <App />
      </DonnerProvider>
    </AuthProvider>
  </StrictMode>,
)
