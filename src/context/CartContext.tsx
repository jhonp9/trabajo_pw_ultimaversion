// CartContext.tsx
import { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';

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
  checkout: (userId: number) => Promise<boolean>;
  purchasedGames: number[];
  showPayment: boolean;
  setShowPayment: (show: boolean) => void;
  showReceipt: boolean;
  setShowReceipt: (show: boolean) => void;
  processPayment: (userId: number) => Promise<boolean>;
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
  const { user } = useAuth();

  // Calcula el total y la cantidad de items
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Cargar juegos comprados del usuario al iniciar
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/auth/user/${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.purchasedGames) {
            setPurchasedGames(data.purchasedGames);
          }
        })
        .catch(error => console.error('Error loading purchased games:', error));
    }
  }, [user]);

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
  const checkout = useCallback(async (userId: number): Promise<boolean> => {
    try {
      // Procesar cada juego en el carrito
      const purchasePromises = cartItems.map(item => 
        fetch(`http://localhost:5000/api/games/${item.id}/purchase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.email}`
          },
          body: JSON.stringify({
            userId,
            quantity: item.quantity
          })
        })
      );

      await Promise.all(purchasePromises);
      
      // Actualizar lista de juegos comprados
      const purchasedIds = cartItems.map(item => item.id);
      setPurchasedGames(prev => [...prev, ...purchasedIds]);
      
      // Vaciar carrito
      setCartItems([]);
      setShowCart(false);
      showNotification('Compra realizada con éxito!');
      
      return true;
    } catch (error) {
      console.error('Checkout error:', error);
      showNotification('Error al procesar la compra');
      return false;
    }
  }, [cartItems, user]);

  // Procesar pago (similar a checkout pero con más pasos)
  const processPayment = useCallback(async (userId: number): Promise<boolean> => {
    const success = await checkout(userId);
    if (success) {
      setShowPayment(false);
      setShowReceipt(true);
    }
    return success;
  }, [checkout]);

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