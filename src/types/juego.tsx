// types/juego.type.ts
export interface Juego {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
  requirements: {
    minimum: string[];
    recommended: string[];
  };
  trailerUrl: string;
}