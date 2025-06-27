import { useEffect } from 'react';

interface ConfirmacionProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirmacion = ({ message, onConfirm, onCancel }: ConfirmacionProps) => {
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
          <div className="confirm-buttons">
            <button className="btn btn-confirm" onClick={onConfirm}>
              Sí, vaciar
            </button>
            <button className="btn btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmacion;