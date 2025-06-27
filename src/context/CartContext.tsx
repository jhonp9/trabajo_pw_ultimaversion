import { createContext, useState, useContext, type ReactNode, useCallback } from 'react';
import { gamesData } from '../data/gamesData';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  total: number;
  itemsCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (show: boolean) => void;
  notification: { show: boolean; message: string };
  showNotification: (message: string) => void;
  checkout: () => void;
  purchasedGames: number[];
  addPurchasedGames: (gameIds: number[]) => void;
  updateGameSales: (gameId: number, quantity: number) => void;
  updateGameRating: (gameId: number, newRating: number) => void;
  getGameSales: (gameId: number) => number;
  showPayment: boolean;
  setShowPayment: (show: boolean) => void;
  showReceipt: boolean;
  setShowReceipt: (show: boolean) => void;
  processPayment: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [purchasedGames, setPurchasedGames] = useState<number[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  // Calcula el total y la cantidad de items
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Actualizar ventas de un juego
  const updateGameSales = useCallback((gameId: number, quantity: number) => {
    const gameIndex = gamesData.findIndex(game => game.id === gameId);
    if (gameIndex !== -1) {
      gamesData[gameIndex].sales += quantity;
      // Guardar en localStorage para persistencia
      localStorage.setItem('gamesData', JSON.stringify(gamesData));
    }
  }, []);

  // Actualizar rating de un juego
  const updateGameRating = useCallback((gameId: number, newRating: number) => {
    const gameIndex = gamesData.findIndex(game => game.id === gameId);
    if (gameIndex !== -1) {
      // Calcular nuevo rating promedio
      const game = gamesData[gameIndex];
      const totalRatings = game.reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRatings / game.reviews.length;
      gamesData[gameIndex].rating = parseFloat(averageRating.toFixed(1));
      localStorage.setItem('gamesData', JSON.stringify(gamesData));
    }
  }, []);

  // Obtener ventas de un juego
  const getGameSales = useCallback((gameId: number) => {
    const game = gamesData.find(game => game.id === gameId);
    return game ? game.sales : 0;
  }, []);

  // Añadir al carrito
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showNotification(`${item.title} añadido al carrito`);
  }, []);

  const addPurchasedGames = (gameIds: number[]) => {
    setPurchasedGames(prev => [...prev, ...gameIds]);
  };

  // Eliminar un item del carrito
  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showNotification('Producto eliminado del carrito');
  }, []);

  // Actualizar cantidad de un item
  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Vaciar carrito
  const clearCart = useCallback(() => {
    setCartItems([]);
    setShowConfirm(false);
    showNotification('Carrito vaciado');
  }, []);

  // Procesar compra
  const checkout = useCallback(() => {
    // Actualizar ventas para cada juego en el carrito
    cartItems.forEach(item => {
      updateGameSales(item.id, item.quantity);
    });
    
    // Añadir juegos comprados
    const purchasedIds = cartItems.map(item => item.id);
    addPurchasedGames(purchasedIds);
    
    setCartItems([]);
    setShowCart(false);
    showNotification('Compra realizada con éxito!');
  }, [cartItems, updateGameSales]);

  // Mostrar notificación
  const showNotification = useCallback((message: string) => {
    setNotification({ show: true, message });
    const timer = setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Función para procesar el pago
  const processPayment = useCallback(() => {
    // Aquí iría la lógica real de pago
    // Por ahora simulamos el proceso
    
    // 1. Actualizar ventas
    cartItems.forEach(item => {
      updateGameSales(item.id, item.quantity);
    });
    
    // 2. Añadir a juegos comprados
    const purchasedIds = cartItems.map(item => item.id);
    addPurchasedGames(purchasedIds);
    
    // 3. Vaciar carrito
    setCartItems([]);
    setShowCart(false);
    setShowPayment(false);
    
    // 4. Mostrar recibo
    setShowReceipt(true);
    
    showNotification('Compra realizada con éxito!');
  }, [cartItems, updateGameSales]);

  // Cargar datos guardados al iniciar
  useState(() => {
    const savedGamesData = localStorage.getItem('gamesData');
    if (savedGamesData) {
      const parsedData = JSON.parse(savedGamesData);
      gamesData.forEach((game, index) => {
        if (parsedData[index]) {
          game.sales = parsedData[index].sales;
          game.rating = parsedData[index].rating;
        }
      });
    }
  });

  return (
    <CartContext.Provider value={{
      cartItems,
      total,
      itemsCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      checkout,
      showCart,
      setShowCart,
      showConfirm,
      setShowConfirm,
      notification,
      showNotification,
      purchasedGames,
      addPurchasedGames,
      updateGameSales,
      updateGameRating,
      getGameSales,
      showPayment,
      setShowPayment,
      showReceipt,
      setShowReceipt,
      processPayment
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};