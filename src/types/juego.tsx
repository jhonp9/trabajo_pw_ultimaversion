export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  userId?: number;
}

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
  oferta: string;
  requirements: {
    minimum: string[];
    recommended: string[];
  };
  trailerUrl: string;
  reviews: Review[];
}