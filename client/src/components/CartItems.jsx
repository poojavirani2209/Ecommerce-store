import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ userId,refreshCart, setRefreshCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get(`http://localhost:8887/cart/cart-${userId}`);
        setCartItems(response.data.items);
        calculateTotal(response.data.items);
        setRefreshCart(false);
      } catch (error) {
        console.error('Error fetching cart items', error);
      }
    }
    fetchCartItems();
  }, [refreshCart]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p>Total: ${totalAmount}</p>
          </>
      )}
    </div>
  );
};

export default Cart;
