import { useState } from "react";
import "./App.css";
import Cart from "./components/CartItems";
import ItemList from "./components/ItemsList";

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
    </div>
  );
}

export default App;
