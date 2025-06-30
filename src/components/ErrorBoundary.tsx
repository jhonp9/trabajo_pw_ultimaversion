// src/components/ErrorBoundary.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleErrors = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      navigate('/error', { state: { error: event.error.message } });
    };

    window.addEventListener('error', handleErrors);
    return () => window.removeEventListener('error', handleErrors);
  }, [navigate]);

  return <>{children}</>;
};