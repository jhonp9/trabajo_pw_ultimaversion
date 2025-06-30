// For Vite: use import.meta.env; for CRA: use process.env (with proper setup)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '5000');

export const apiClient = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // En tu apiClient.ts
  // El manejo de expiración de token se mueve dentro del catch más abajo

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        // Manejo de expiración de token
        throw new Error('Token expired');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'name' in error && (error as { name?: string }).name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
};