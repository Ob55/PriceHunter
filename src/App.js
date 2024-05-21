import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import Login from "./common/Login/Loginpage";
import SearchResult from "./common/SearchResult/SearchResult";
import About from "./common/footer/About";
import "./common/SearchResult/SearchResult.css"; 
import UserAccount from "./common/UserAccount/UserAccount";
import "./common/UserAccount/UserAccount.css";

const App = () => {
  const { productItems } = Data;
  const { shopItems } = Sdata;

  const [CartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item
        )
      );
    }
  };

  return (
    <Router>
      <Header CartItem={CartItem} />
      <Switch>
        <Route path="/" exact>
          <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/cart" exact>
          <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
        </Route>
        <Route path="/login" exact>
          <Login /> {/* Render the Login component */}
        </Route>
        <Route path="/search-results" exact>
          <SearchResult /> {/* Render the SearchResult component */}
        </Route>
        <Route path="/about" exact>
          <About /> {/* Render the About component */}
        </Route>
        <Route path="/user" exact>
  <UserAccount />
</Route>

      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
