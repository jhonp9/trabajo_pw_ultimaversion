// types/noticia.type.ts
export interface Noticia {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen?: string;
  autor: string;
}