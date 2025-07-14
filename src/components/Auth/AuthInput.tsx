import type { InputHTMLAttributes } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: 'user' | 'email';
  label?: string;
  error?: string | boolean; // Acepta string o boolean para compatibilidad con Formik
};

const AuthInput = ({ icon, label, error, ...props }: AuthInputProps) => {
  const IconComponent = icon === 'user' ? FaUser : FaEnvelope;
  
  return (
    <div className="auth-input-container mb-3">
      {label && <label htmlFor={props.id} className="form-label auth-label">{label}</label>}
      <div className="input-group auth-input-group">
        {icon && (
          <span className="input-group-text auth-input-icon">
            <IconComponent className="auth-icon" />
          </span>
        )}
        <input 
          className={`form-control auth-input ${error ? 'is-invalid' : ''}`} 
          {...props} 
        />
        {typeof error === 'string' && error && (
          <div className="invalid-feedback">{error}</div>
        )}
      </div>
    </div>
  );
};

export default AuthInput;