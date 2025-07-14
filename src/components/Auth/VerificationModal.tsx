import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

interface VerificationModalProps {
  show: boolean;
  onHide: () => void;
  email: string;
  onVerify: (code: string) => Promise<boolean>;
  error?: string;
}

const VerificationModal = ({ 
  show, 
  onHide, 
  email, 
  onVerify,
  error
}: VerificationModalProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onVerify(code);
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Verificación de Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Hemos enviado un código de verificación a <strong>{email}</strong>.</p>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Código de Verificación</Form.Label>
            <Form.Control
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa el código de 6 dígitos"
              required
              maxLength={6}
            />
          </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit"
            disabled={loading || code.length !== 6}
            className="mt-3"
          >
            {loading ? 'Verificando...' : 'Verificar Código'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VerificationModal;