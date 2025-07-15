// src/ProductList.jsx
import { useState, useEffect } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import PropTypes from 'prop-types';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        // add the rest here...
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar">
        <h2 onClick={onHomeClick} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <button onClick={() => setShowCart(true)}>🛒 Cart</button>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, i) => (
            <div key={i}>
              <h3>{categoryObj.category}</h3>
              <div className="plant-category">
                {categoryObj.plants.map((plant, j) => (
                  <div key={j} className="plant-card">
                    <img src={plant.image} alt={plant.name} />
                    <h4>{plant.name}</h4>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

ProductList.propTypes = {
  onHomeClick: PropTypes.func.isRequired
};

export default ProductList;
