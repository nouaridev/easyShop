import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import './css/dashboard.css'
import App from './App.jsx'
// contexts: 
import AuthProvider from './contexts/tokenContext'
 
createRoot(document.getElementById('root')).render(
    <AuthProvider>
       <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
)
