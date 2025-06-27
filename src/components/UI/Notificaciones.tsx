import { useCart } from '../../context/CartContext';

const Notificacion = () => {
  const { notification } = useCart();
  
  if (!notification.show) return null;

  return (
    <div className="notification">
      <div className="notification-content">
        {notification.message}
      </div>
    </div>
  );
};

export default Notificacion;