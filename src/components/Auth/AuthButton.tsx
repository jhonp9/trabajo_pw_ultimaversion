import type { ButtonHTMLAttributes, ReactNode } from 'react';

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  icon?: ReactNode;
};

export const AuthButton = ({ 
  children, 
  variant = 'primary', 
  icon, 
  ...props 
}: AuthButtonProps) => {
  return (
    <button 
      {...props}
      type={props.type || 'button'} // Asegura que siempre haya un tipo
      className={`auth-button btn-${variant} ${variant === 'primary' ? 'btn-login' : 'btn-outline-primary'}`}
    >
      {icon && <span className="auth-button-icon me-2">{icon}</span>}
      <span className="auth-button-text">{children}</span>
    </button>
  );
};