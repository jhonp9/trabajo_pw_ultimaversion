// client.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '5000');

export const apiClient = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    console.log(`Enviando petición a: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
      credentials: 'include'
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error en respuesta:', { status: response.status, errorData });
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      (error as any).status = response.status;
      (error as any).responseData = errorData;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('Error en apiClient:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutError = new Error('La solicitud tardó demasiado');
      (timeoutError as any).status = 408;
      throw timeoutError;
    }
    throw error;
  }
};