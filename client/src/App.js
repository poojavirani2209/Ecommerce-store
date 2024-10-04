import { useState } from "react";
import "./App.css";
import Cart from "./components/CartItems";
import ItemList from "./components/ItemsList";
import AdminOrderSummary from "./components/AdminOrderSummary";

function App() {
  const [userId, setUserId] = useState("1"); // Hardcoded user ID for now
  const [refreshCart, setRefreshCart] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleItemAddedToCart = () => {
    setRefreshCart(true);
  };

  const handleLogin = () => {
    if (
      userId === "user1" ||
      userId === "user2" ||
      userId === "user3" ||
      userId == "admin"
    ) {
      /**
       * This is a dummy login page. Ideally should be handled by sign up and
       * login by authenticating through backend.
       */
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid user ID");
    }
  };

  if (!loggedIn) {
    return (
      <div className="Login">
        <h2>Login</h2>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <div>
          <input
            type="text"
            placeholder="User ID"
            value={userId || ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="App">
      {userId == "admin" && <AdminOrderSummary />}
      {userId != "admin" && (
        <>
          <ItemList userId={userId} onItemAddedToCart={handleItemAddedToCart} />
          <Cart
            userId={userId}
            refreshCart={refreshCart}
            setRefreshCart={setRefreshCart}
          />
        </>
      )}
    </div>
  );
}

export default App;
