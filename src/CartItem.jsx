// src/CartItem.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.cost.substring(1)); // removes $
    return (price * item.quantity).toFixed(2);
  };

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.cost.substring(1));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div className="cart-item-card" key={index}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong>Price:</strong> {item.cost}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p><strong>Subtotal:</strong> ${calculateItemSubtotal(item)}</p>
                <button className="remove-button" onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${calculateTotalAmount()}</h3>
            <div className="cart-actions">
              <button className="continue-button" onClick={onContinueShopping}>
                Continue Shopping
              </button>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
