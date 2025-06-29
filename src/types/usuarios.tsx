// types/usuarios.ts
export interface Usuario {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
  password?: string;
}