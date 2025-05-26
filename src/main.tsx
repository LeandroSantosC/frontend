import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider anchorOrigin={{vertical: 'bottom',horizontal: 'center'}} autoHideDuration={3000}>
      <App />
    </SnackbarProvider>
  </StrictMode>,
)
