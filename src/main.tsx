import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/index.css'
import App from './App.tsx'

// Logs de erro global para debug
window.addEventListener('error', e => {
  console.error('Global Error:', e.error);
});
window.addEventListener('unhandledrejection', e => {
  console.error('Unhandled Promise:', e.reason);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
