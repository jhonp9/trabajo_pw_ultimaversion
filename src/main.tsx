import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main_unificado.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './components/Auth/AuthContext';
import { AdminProvider } from './context/AdminContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <AdminProvider>
            <App />
        </AdminProvider>
      </AuthProvider>
  </StrictMode>
);
