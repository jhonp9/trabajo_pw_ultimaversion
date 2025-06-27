import { useCart } from "../../context/CartContext";
import { useState } from 'react';
import Confirmacion from './Confirmacion';

const CarritoSidebar = () => {
  const { 
    cartItems,
    total,
    itemsCount,
    removeFromCart,
    updateQuantity,
    showCart,
    clearCart,
    setShowCart,
    showConfirm,
    setShowConfirm,
    checkout
  } = useCart();

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowCart(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <div 
        className={`cart-overlay ${showCart ? 'show' : ''} ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
      />
      
      <div 
        className={`cart-sidebar ${showCart ? 'show' : ''} ${isClosing ? 'closing' : ''}`}
      >
        <div className="cart-content">
          <div className="cart-header">
            <h3>
              <i className="fas fa-shopping-cart me-2"></i>
              Carrito ({itemsCount})
            </h3>
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
          </div>

          <div className="cart-body">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <i className="fas fa-shopping-cart fa-4x"></i>
                <p>Tu carrito está vacío</p>
                <button 
                  className="btn btn-continue" 
                  onClick={handleClose}
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-info">
                        <span className="item-title">{item.title}</span>
                        <span className="item-price">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="item-actions">
                        <div className="quantity-control">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            +
                          </button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row sub">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row sub">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="cart-footer">
                  <button 
                    className="btn btn-checkout"
                    onClick={() => checkout()}
                  >
                    Finalizar Compra
                  </button>
                  <button 
                    className="btn btn-clear"
                    onClick={() => clearCart()}
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <Confirmacion 
          message="¿Estás seguro de que quieres vaciar el carrito?"
          onConfirm={() => {
            setShowConfirm(false);
            setShowCart(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default CarritoSidebar;