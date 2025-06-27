import type { ReactNode, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';

type AuthFormProps = {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitText: string;
  links?: {
    text: string;
    to: string;
    linkText: string;
  }[];
};

export const AuthForm = ({ children, onSubmit, submitText, links }: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      
      <button type="submit" className="btn btn-login mb-3 w-100">
        {submitText}
      </button>
      
      {links?.map((link, index) => (
        <div key={index} className="text-center links mb-2">
          {link.text}{' '}
          <Link to={link.to} className="auth-link">
            {link.linkText}
          </Link>
        </div>
      ))}
    </form>
  );
};