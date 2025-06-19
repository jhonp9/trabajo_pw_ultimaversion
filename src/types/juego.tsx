// types/juego.type.ts
export interface Juego {
  id: number;
  title: string;
  description: string;
  price: number;
  sales: number;
  rating: number;
  images: string[];
  genres: string[];
  platforms: string[];
  requirements: {
    minimum: string[];
    recommended: string[];
  };
  trailerUrl: string;
}