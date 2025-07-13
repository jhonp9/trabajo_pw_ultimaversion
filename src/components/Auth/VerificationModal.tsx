import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

interface VerificationModalProps {
  show: boolean;
  onHide: () => void;
  email: string;
  onVerify: (code: string) => Promise<boolean>;
  onResend: () => Promise<void>;
  error?: string;
}

const VerificationModal = ({ 
  show, 
  onHide, 
  email, 
  onVerify, 
  onResend,
  error: propError
}: VerificationModalProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setError(propError || '');
  }, [propError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const isValid = await onVerify(code);
      if (!isValid && !error) {
        setError('Código inválido. Intente nuevamente.');
      }
    } catch (err) {
      setError('Error al verificar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setSuccess('');
    setError('');
    try {
      await onResend();
      setSuccess('Código reenviado correctamente');
    } catch (err) {
      setError('Error al reenviar el código');
    } finally {
      setResending(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="auth-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Verificación de Email</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="verification-text">
          Hemos enviado un código de verificación a <strong>{email}</strong>. 
          Por favor ingrésalo a continuación:
        </p>
        
        {error && <Alert variant="danger" className="alert-message">{error}</Alert>}
        {success && <Alert variant="success" className="alert-message">{success}</Alert>}
        
        <Form onSubmit={handleSubmit} className="verification-form">
          <Form.Group className="form-group">
            <Form.Label className="form-label">Código de Verificación</Form.Label>
            <Form.Control
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa el código de 6 dígitos"
              required
              className="form-control"
              maxLength={6}
            />
          </Form.Group>
          
          <div className="verification-actions">
            <Button 
              variant="link" 
              onClick={handleResend}
              disabled={resending}
              className="resend-button"
            >
              {resending ? 'Enviando...' : 'Reenviar código'}
            </Button>
            
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading || !code}
              className="verify-button"
            >
              {loading ? 'Verificando...' : 'Verificar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VerificationModal;