import { useEffect, type ReactNode } from 'react';
import { useAuth } from '../Auth/AuthContext';

interface ConfirmacionProps {
  message: string | ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'clear' | 'checkout' | 'payment';
}

const Confirmacion = ({ message, onConfirm, onCancel, type = 'clear' }: ConfirmacionProps) => {
  const { user } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <div className="confirm-content">
          <p className="mensaje">{message}</p>
          
          {!user && type === 'checkout' && (
            <div className="alert alert-warning mb-3">
              Debes <a href="/login" className="alert-link">iniciar sesión</a> para realizar una compra.
            </div>
          )}

          {type === 'payment' && user && (
            <div className="payment-form mb-3">
              <div className="mb-3">
                <label className="form-label">Número de tarjeta</label>
                <input type="text" className="form-control" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Fecha de expiración</label>
                  <input type="text" className="form-control" placeholder="MM/AA" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">CVV</label>
                  <input type="text" className="form-control" placeholder="123" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre en la tarjeta</label>
                <input type="text" className="form-control" placeholder="JUAN PEREZ" />
              </div>
            </div>
          )}

          <div className="confirm-buttons">
            {user || type !== 'checkout' ? (
              <>
                <button className="btn btn-confirm" onClick={onConfirm}>
                  {type === 'payment' ? 'Pagar ahora' : 'Aceptar'}
                </button>
                <button className="btn btn-cancel" onClick={onCancel}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={onCancel}>
                Entendido
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmacion;