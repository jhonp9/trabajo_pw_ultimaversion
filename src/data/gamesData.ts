import type { Juego } from '../types/juego';

export const gamesData: Juego[] = [
  {
    id: 1,
    title: "The Witcher 3",
    description: "RPG de mundo abierto...",
    price: 29.99,
    rating: 4.9,
    sales: 5000000,
    genres: ["RPG", "Aventura"],
    platforms: ["PC", "PlayStation", "Xbox"],
    oferta: "Si",
    images: ["https://via.placeholder.com/300x180/00ff88/000000?text=Witcher+3"],
    requirements: {
      minimum: ["CPU: Intel Core i5-2500K", "GPU: NVIDIA GTX 660", "RAM: 6GB"],
      recommended: ["CPU: Intel Core i7-3770", "GPU: NVIDIA GTX 770", "RAM: 8GB"]
    },
    trailerUrl: "https://www.youtube.com/watch?v=XYZ123",
    reviews: [
      {
        id: "1",
        author: "ola",
        rating: 4,
        comment: "bueno",
        date: "mayo"
  }]
},
  {
    id: 2,
    title: "Cyberpunk 2077",
    description: "RPG de acción...",
    price: 49.99,
    rating: 4.5,
    sales: 3000000,
    oferta: "",
    genres: ["RPG", "Shooter"],
    platforms: ["PC", "PlayStation", "Xbox"],
    images: ["https://via.placeholder.com/300x180/00ff88/000000?text=Cyberpunk"],
    requirements: {
      minimum: ["CPU: Intel Core i5-3570K", "GPU: NVIDIA GTX 780", "RAM: 8GB"],
      recommended: ["CPU: Intel Core i7-4790", "GPU: NVIDIA GTX 1060", "RAM: 12GB"]
    },
    trailerUrl: "https://www.youtube.com/watch?v=ABC456",
    reviews: [
      {
        id: "1",
        author: "ola",
        rating: 4,
        comment: "bueno",
        date: "mayo"
  }]
  }
  // ... más juegos
];