import { gamesData } from '../data/gamesData';

// Mock data para usuarios
const usersData = [
    {
      id: '1',
      name: 'Admin',
      email: 'admin@gamehub.com',
      role: 'admin',
      createdAt: new Date('2023-01-01')
    }
    //... otros usuarios
  ];
  
  export const getUsers = async () => {
    return usersData;
  };
  
  export const deleteUser = async (id: string) => {
    const index = usersData.findIndex(u => u.id === id);
    if (index !== -1) {
      usersData.splice(index, 1);
      return true;
    }
    return false;
  };

export const getGames = async () => {
  // En producción, esto sería una llamada a tu backend
  return gamesData;
};

export const addGame = async (gameData) => {
  // Lógica para agregar juego
  const newGame = {
    id: Math.max(...gamesData.map(g => g.id)) + 1,
    ...gameData,
    sales: 0,
    reviews: []
  };
  gamesData.push(newGame);
  return newGame;
};

export const updateGame = async (id, gameData) => {
  // Lógica para actualizar juego
  const index = gamesData.findIndex(g => g.id === id);
  if (index !== -1) {
    gamesData[index] = { ...gamesData[index], ...gameData };
    return gamesData[index];
  }
  return null;
};

export const deleteGame = async (id) => {
  // Lógica para eliminar juego
  const index = gamesData.findIndex(g => g.id === id);
  if (index !== -1) {
    gamesData.splice(index, 1);
    return true;
  }
  return false;
};

let newsData = [
    {
      id: '1',
      title: 'Nuevo juego agregado',
      content: 'Hemos agregado un nuevo juego a nuestro catálogo',
      date: new Date(),
      image: ''
    }
  ];
  
  export const getNews = async () => {
    return newsData;
  };
  
  export const addNews = async (newsItem) => {
    const newItem = {
      id: Date.now().toString(),
      date: new Date(),
      ...newsItem
    };
    newsData.push(newItem);
    return newItem;
  };
  
  export const updateNews = async (id, newsItem) => {
    const index = newsData.findIndex(n => n.id === id);
    if (index !== -1) {
      newsData[index] = { ...newsData[index], ...newsItem };
      return newsData[index];
    }
    return null;
  };
  
  export const deleteNews = async (id) => {
    newsData = newsData.filter(n => n.id !== id);
    return true;
  };

  export const getSalesData = async () => {
    // En una app real, esto vendría de tu backend
    const currentMonth = new Date().getMonth();
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    // Genera datos aleatorios pero realistas
    const revenue = months.map((_, index) => {
      const base = index <= currentMonth ? 
        Math.floor(Math.random() * 20000) + 10000 : 
        0;
      return index === currentMonth ? base * 1.3 : base; // Aumenta el mes actual
    });
  
    return {
      months: months.slice(0, currentMonth + 1),
      revenue: revenue.slice(0, currentMonth + 1)
    };
  };