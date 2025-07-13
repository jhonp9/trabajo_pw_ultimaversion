import { apiClient } from '../api/client';

export const authService = {
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await apiClient('/api/auth/check-email', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      return response.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      throw new Error('Error al verificar el email');
    }
  },

  async registerUser(userData: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await apiClient('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return response;
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.message || 'Error en el registro' 
      };
    }
  },

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