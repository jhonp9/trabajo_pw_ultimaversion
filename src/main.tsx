import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main_unificado.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './components/Auth/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename='/trabajo_pw_ultimaversion'>
      <AuthProvider>
        <AdminProvider>
            <App />
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);