// types/usuarios.ts
export interface Usuario {
  id?: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  password?: string;
}