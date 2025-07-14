import { useCart } from "../../context/CartContext";
import { useState } from 'react';
import Confirmacion from './Confirmacion';
import { useAuth } from "../Auth/AuthContext";

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
    showPayment,
    setShowPayment,
    showReceipt,
    setShowReceipt,
    processPayment
  } = useCart();

  const { user } = useAuth();
  const [isClosing, setIsClosing] = useState(false);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowCart(false);
      setIsClosing(false);
    }, 300);
  };

  const handleCheckout = () => {
    if (!user) {
      setShowConfirm(true); // Mostrar mensaje de login requerido
      return;
    }
    setShowPayment(true); // Mostrar formulario de pago
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
                    onClick={handleCheckout}
                  >
                    Finalizar Compra
                  </button>
                  <button 
                    className="btn btn-clear"
                    onClick={() => setShowConfirm(true)}
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación para vaciar carrito */}
      {showConfirm && (
        <Confirmacion 
          message={user ? 
            "¿Estás seguro de que quieres vaciar el carrito?" : 
            "Debes iniciar sesión para realizar una compra"}
          onConfirm={() => {
            if (user) {
              clearCart();
            }
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
          type={user ? 'clear' : 'checkout'}
        />
      )}

      {/* Modal de pago */}
      {showPayment && (
        <Confirmacion 
          message="Ingresa los datos de tu tarjeta"
          onConfirm={() => {
            if (user?.id !== undefined) {
              processPayment(user.id);
            }
          }}
          onCancel={() => setShowPayment(false)}
          type="payment"
        />
      )}

      {/* Modal de recibo */}
      {showReceipt && (
        <Confirmacion 
          message={
            <>
              <h5 className="mb-3">¡Compra realizada con éxito!</h5>
              <p>Los detalles de tu compra y las claves de activación han sido enviados a:</p>
              <p className="fw-bold">{user?.email}</p>
            </>
          }
          onConfirm={() => setShowReceipt(false)}
          onCancel={() => setShowReceipt(false)}
        />
      )}
    </>
  );
};

export default CarritoSidebar;