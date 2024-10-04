import { useState } from "react";
import "./App.css";
import Cart from "./components/CartItems";
import ItemList from "./components/ItemsList";
import AdminOrderSummary from "./components/AdminOrderSummary";

function App() {
  const [userId, setUserId] = useState("1"); // Hardcoded user ID for now
  const [refreshCart, setRefreshCart] = useState(false);

  const handleItemAddedToCart = () => {
    setRefreshCart(true);
  };

  return (
    <div className="App">
      <ItemList userId={userId} onItemAddedToCart={handleItemAddedToCart} />
      <Cart
        userId={userId}
        refreshCart={refreshCart}
        setRefreshCart={setRefreshCart}
      />
      <AdminOrderSummary />
    </div>
  );
}

export default App;
