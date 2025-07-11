import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/Auth/AuthLayout';
import AuthInput from '../components/Auth/AuthInput';
import { AuthButton } from '../components/Auth/AuthButton';
import { useAuth } from '../components/Auth/AuthContext';
import { useState } from 'react';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newUser = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: 'user' as const,
    };
    
    if (formData.get('password') !== formData.get('confirmPassword')) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (await register(newUser)) {
      navigate('/');
    } else {
      setError('El usuario ya existe');
    }
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="row">
          <div className="col-md-6 mb-3">
            <AuthInput 
              type="text" 
              id="firstName" 
              label="Nombre" 
              placeholder="Ej: Juan" 
              required 
            />
          </div>
          <div className="col-md-6 mb-3">
            <AuthInput 
              type="text" 
              id="lastName" 
              label="Apellido" 
              placeholder="Ej: Pérez" 
              required 
            />
          </div>
        </div>
        
        <AuthInput 
          type="text" 
          id="username" 
          label="Nombre de Usuario" 
          placeholder="Ej: juanplayer" 
          icon="user"
          required 
        />
        
        <AuthInput 
          type="email" 
          id="email" 
          label="Correo Electrónico" 
          placeholder="tucorreo@ejemplo.com" 
          required 
        />
        
        <AuthInput 
          type="password" 
          id="password" 
          label="Contraseña" 
          placeholder="••••••••" 
          required 
        />
        
        <AuthInput 
          type="password" 
          id="confirmPassword" 
          label="Confirmar Contraseña" 
          placeholder="••••••••" 
          required 
        />
        
        <AuthInput 
          type="date" 
          id="birthdate" 
          label="Fecha de Nacimiento" 
          required 
        />
        
        <div className="auth-terms mb-3 form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="terms" 
            required 
          />
          <label className="form-check-label" htmlFor="terms">
            Acepto los <a href="#" className="terms-link">Términos y Condiciones</a>
          </label>
        </div>
        
        <AuthButton type="submit" variant="primary">
          Registrarse
        </AuthButton>
        
        <div className="auth-login-link text-center links">
          ¿Ya tienes una cuenta?{' '}
          <button 
            type="button" 
            className="btn-link auth-link"
            onClick={() => navigate('/login')}
          >
            Inicia Sesión
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};