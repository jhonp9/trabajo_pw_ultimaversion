import { createContext, useState, useContext, type ReactNode, useCallback } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number; // Añadimos cantidad
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [purchasedGames, setPurchasedGames] = useState<number[]>([]);

  // Calcula el total y la cantidad de items
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Añadir al carrito (si ya existe, aumenta la cantidad)
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
    setCartItems([]);
    setShowCart(false);
    showNotification('Compra realizada con éxito!');
  }, []);

  // Mostrar notificación
  const showNotification = useCallback((message: string) => {
    setNotification({ show: true, message });
    const timer = setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
      addPurchasedGames
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