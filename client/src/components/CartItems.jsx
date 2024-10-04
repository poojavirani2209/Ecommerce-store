import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ userId, refreshCart, setRefreshCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState(null);


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

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`http://localhost:8887/checkout`, {
        userId,
        cartId: `cart-${userId}`,
        discountCode: null,
      });
      setCheckoutMessage(`Checkout successful! Total Amount: $${response.data.totalAmount}`);
    } catch (error) {
      setCheckoutMessage('Error during checkout');
    }
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
          <button onClick={handleCheckout}>Checkout</button>
          {checkoutMessage && <p>{checkoutMessage}</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
