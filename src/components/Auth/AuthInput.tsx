import type { InputHTMLAttributes } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: 'user' | 'email';
  label?: string;
  error?: string;
};

const AuthInput = ({ icon, label, ...props }: AuthInputProps) => {
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
          className="form-control auth-input" 
          {...props} 
        />
      </div>
    </div>
  );
};

export default AuthInput;