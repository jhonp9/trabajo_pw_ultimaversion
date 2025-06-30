import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main_unificado.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './components/Auth/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AdminProvider> {/* Envuelve con AdminProvider */}
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AdminProvider>
    </AuthProvider>
  </React.StrictMode>
);