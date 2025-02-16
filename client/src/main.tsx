import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from "./routes/Routes.tsx";
import './main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppRoutes />
  </StrictMode>,
)
