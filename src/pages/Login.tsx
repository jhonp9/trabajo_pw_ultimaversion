import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/Auth/AuthLayout';
import { FaGoogle, FaTwitter, FaDiscord } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { user } = useAuth();
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
  };

  const validar = (email: string, password: string) => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return false;
    }
    
    const success = login(email, password);
    if (!success) {
      setError('Credenciales inválidas');
      return false;
    }
    
    // Redirigir según el rol
    if (user?.role === 'admin') {
      navigate('/admin/juegos');
    } else {
      navigate('/');
    }
    
    return true;
  }

  return (
    <AuthLayout title="Iniciar Sesión">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Correo Electrónico</label>
        <input 
          type="email" 
          className="form-control" 
          id="email" 
          placeholder="tucorreo@ejemplo.com" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input 
          type="password" 
          className="form-control" 
          id="password" 
          placeholder="••••••••" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="form-group form-check">
        <input 
          type="checkbox" 
          className="form-check-input" 
          id="remember" 
        />
        <label className="form-check-label" htmlFor="remember">
          Recordarme
        </label>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-login w-100"
        onClick={() => validar(email, password) ? login(email, password) : setError('Credenciales inválidas')}
      >
        Ingresar
      </button>

      <div className="auth-links">
        <button 
          type="button" 
          className="btn btn-link"
          onClick={() => navigate('/')}
        >
          Ingresar sin iniciar sesión
        </button>
        <button 
          type="button" 
          className="btn btn-link"
          onClick={() => navigate('/forgot-password')}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
      
      <div className="social-login text-center">
      <div className="divider"></div>
        <div>O inicia sesión con</div>
        <div className="social-buttons">
          <button type="button">
            <FaGoogle size={24} />
          </button>
          <button type="button">
            <FaTwitter size={24} />
          </button>
          <button type="button">
            <FaDiscord size={24} />
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <span>¿No tienes cuenta?</span>
        <button 
          type="button" 
          className="btn btn-link"
          onClick={() => navigate('/register')}
        >
          Regístrate
        </button>
      </div>
    </form>
    </AuthLayout>
  );
};