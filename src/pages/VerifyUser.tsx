import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/Auth/AuthLayout';
import { FaCheckCircle } from 'react-icons/fa';
import { AuthButton } from '../components/Auth/AuthButton';

export const VerifyUser = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Usuario Verificado">
      <div className="auth-verification text-center">
        <FaCheckCircle className="auth-verification-icon text-success mb-3" size={50} />
        <p className="auth-verification-message mb-4">
          Tu usuario ha sido verificado correctamente.
        </p>
        <AuthButton 
          variant="primary"
          onClick={() => navigate('/reset-password')}
        >
          Continuar a Restablecer Contraseña
        </AuthButton>
      </div>
    </AuthLayout>
  );
};