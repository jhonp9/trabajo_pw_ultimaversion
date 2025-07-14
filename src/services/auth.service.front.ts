import { apiClient } from '../api/client';

export const authService = {
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      console.log(`Verificando email: ${email}`);
      const response = await apiClient('/api/auth/check-email', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      
      console.log('Respuesta recibida:', response);
      
      if (typeof response.exists !== 'boolean') {
        console.error('Respuesta inesperada:', response);
        throw new Error('Formato de respuesta inválido del servidor');
      }
      
      return response.exists;
    } catch (error: any) {
      console.error('Error en checkEmailExists:', {
        message: error.message,
        status: error.status,
        responseData: error.responseData
      });
      
      let errorMessage = 'Error al verificar el email';
      if (error.status === 400) {
        errorMessage = 'Email no válido';
      } else if (error.status === 500) {
        errorMessage = 'Error del servidor. Por favor intente más tarde.';
      }
      
      throw new Error(errorMessage);
    }
  },

  async registerUser(userData: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ 
    success: boolean; 
    message?: string; 
    requiresVerification?: boolean 
  }> {
    try {
      const response = await apiClient('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return response;
    } catch (error: any) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        message: error.message || 'Error en el registro' 
      };
    }
  } ,


  async verifyEmail(code: string): Promise<{ verified: boolean; message?: string }> {
    try {
      const response = await apiClient('/api/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ code })
      });
      return response;
    } catch (error) {
      console.error('Error verifying email:', error);
      return { 
        verified: false, 
        message: 'Error al verificar el código' 
      };
    }
  },

  async verifyRegistrationCode(email: string, code: string): Promise<{
    success: boolean;
    message?: string;
    user?: any;
  }> {
    try {
      const response = await apiClient('/api/auth/verify-registration', {
        method: 'POST',
        body: JSON.stringify({ email, code })
      });
      return response;
    } catch (error: any) {
      console.error('Error en verificación:', error);
      return { 
        success: false, 
        message: error.message || 'Error al verificar el código' 
      };
    }
  } ,

  async resendVerification(email: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await apiClient('/api/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      return response;
    } catch (error) {
      console.error('Error resending verification:', error);
      return { 
        success: false, 
        message: 'Error al reenviar el código' 
      };
    }
  }
};