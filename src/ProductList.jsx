// src/ProductList.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 }));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const plants = [
    {
      name: "Snake Plant",
      image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
      description: "Produces oxygen at night, improving air quality.",
      cost: "$15"
    },
    {
      name: "Peace Lily",
      image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
      description: "Removes mold spores and purifies the air.",
      cost: "$18"
    }
    // Add more if you want
  ];

  return (
    <div>
      <div className="navbar">
        <div className="luxury">
          <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
          <a href="/" onClick={handleHomeClick}>
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </a>
        </div>
        <div className="cart-section">
          <a href="#" onClick={handleCartClick}>
            <h3>🛒 Cart ({getTotalQuantity()})</h3>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plants.map((plant, index) => (
            <div key={index} className="product-card">
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>{plant.description}</p>
              <p><strong>{plant.cost}</strong></p>
              <button
                disabled={addedToCart[plant.name]}
                onClick={() => handleAddToCart(plant)}
              >
                {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
