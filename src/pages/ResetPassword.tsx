import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/Auth/AuthLayout';
import AuthInput from '../components/Auth/AuthInput';
import { InfoBox } from '../components/Comun/Infobox';
import { AuthButton } from '../components/Auth/AuthButton';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <AuthLayout 
      title="Recuperar Contraseña" 
      description="Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <AuthInput 
          type="email" 
          id="email" 
          label="Correo Electrónico" 
          placeholder="tucorreo@ejemplo.com" 
          icon="email"
          required 
        />
        
        <AuthButton type="submit" variant="primary">
          <i className="fas fa-paper-plane me-2"></i> Enviar Enlace
        </AuthButton>
        
        <div className="auth-back-link text-center links">
          <button 
            type="button" 
            className="btn-link auth-link"
            onClick={() => navigate('/login')}
          >
            <i className="fas fa-arrow-left me-2"></i> Volver al Inicio de Sesión
          </button>
        </div>
      </form>
      
      <InfoBox>
        Si no recibes el correo, revisa tu carpeta de spam o solicita otro enlace.
      </InfoBox>
    </AuthLayout>
  );
};