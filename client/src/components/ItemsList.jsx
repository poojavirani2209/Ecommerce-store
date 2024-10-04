import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = ({ userId, onItemAddedToCart }) => {
  const [items, setItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8887/items');
        setItems(response.data.items);
      } catch (error) {
        setError('Failed to fetch items');
      }
    };

    fetchItems();
  }, []);

  const addToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:8887/cart/add', {
        userId,
        items: [item],
      });
      setCartId(response.data.cartId);
      onItemAddedToCart();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add item to cart');
    }
  };

  return (
    <div>
      <h2>Available Items</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cartId && <p>Cart ID: {cartId}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} ({item.category})
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
