import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/Auth/AuthLayout';
import AuthInput from '../components/Auth/AuthInput';
import { InfoBox } from '../components/Comun/Infobox';
import { AuthButton } from '../components/Auth/AuthButton';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthLayout 
      title="¿Contraseña olvidada?" 
      description="Por favor, ingrese su nombre de usuario para poder restablecer la contraseña"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <AuthInput 
          type="text" 
          id="username" 
          label="Nombre de Usuario" 
          placeholder="Tu nombre de usuario" 
          icon="user"
          required 
        />
        
        <AuthButton 
          type="submit" 
          variant="primary"
          onClick={() => navigate('/verify-user')}
        >
          <i className="fas fa-search me-2"></i> Verificar Usuario
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
        Si no recuerdas tu nombre de usuario, puedes{' '}
        <button 
          type="button" 
          className="btn-link auth-link"
          onClick={() => navigate('/verify-with-email')}
        >
          recuperarlo con tu email
        </button>
      </InfoBox>
    </AuthLayout>
  );
};
export default ForgotPassword;  