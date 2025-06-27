import type { ReactNode } from 'react';
import Navbarlogin from '../Comun/Navbarlogin';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

export const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <Navbarlogin />
      <div className="container auth-container">
        <div className="row justify-content-center">
          <div className="col-md-auto col-lg-auto">
            <div className="auth-form-container">
              <h2 className="auth-title text-center">{title}</h2>
              {description && <p className="text-center mb-auto">{description}</p>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};