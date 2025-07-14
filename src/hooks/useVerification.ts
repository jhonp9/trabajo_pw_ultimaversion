import { useState } from 'react';
import { authService } from '../services/auth.service.front';

export const useVerification = () => {
  const [verificationModal, setVerificationModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const startVerification = (email: string) => {
    setPendingEmail(email);
    setVerificationModal(true);
    setRegisterError('');
    setVerificationSuccess(false);
  };

  const verifyCode = async (code: string) => {
    try {
      const { verified, message } = await authService.verifyEmail(code);
      if (verified) {
        setVerificationModal(false);
        setVerificationSuccess(true);
        return true;
      } else {
        setRegisterError(message || 'Código inválido');
        return false;
      }
    } catch (error) {
      setRegisterError('Error al verificar el código');
      return false;
    }
  };

  const resendCode = async () => {
    try {
      const { success, message } = await authService.resendVerification(pendingEmail);
      if (!success) {
        setRegisterError(message || 'Error al reenviar el código');
      }
    } catch (error) {
      setRegisterError('Error al reenviar el código');
    }
  };

  return {
    verificationModal,
    pendingEmail,
    registerError,
    setRegisterError,
    verificationSuccess,
    setVerificationModal,
    startVerification,
    verifyCode,
    resendCode
  };
};