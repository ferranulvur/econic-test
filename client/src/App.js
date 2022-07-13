import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Search from "./pages/About/Search";
import Login from "./pages/Authentications/Login";
import Register from "./pages/Authentications/Register";
import ResetPassword from "./pages/Authentications/ResetPassword";
import Contact from "./pages/About/Contact";
import Faqs from "./pages/About/Faqs";
import Error404 from "./pages/About/Error-404";
import TrackingOrder from "./pages/About/TrackingOrder";
import TermsOfService from "./pages/About/TermsOfService";
import PrivacyPolicy from "./pages/About/PrivacyPolicy";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Shop/Cart";
import Orders from "./pages/Shop/Orders";
import Checkout from "./pages/Shop/Checkout";
import ProductsDetails from "./pages/Shop/ProductsDetails";
import User from "./pages/User/User";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import ComingSoon from "./pages/About/ComingSoon";

import AuthContext from "./contexts/auth-context";
import CartContext from "./contexts/cart-context";

import MiddleHeader from "./components/Layout/MiddleHeader";
import Navbar from "./components/Layout/Navbar";
import TopHeader from "./components/Layout/TopHeader";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [test, setTest] = useState(null);

  useEffect(() => {
    const _token = JSON.parse(localStorage.getItem("token"));
    const tokenExp = JSON.parse(localStorage.getItem("tokenExpiration"));
    const userIdLocal = JSON.parse(localStorage.getItem("userId"));
    if (_token && userIdLocal && tokenExp) {
      setToken(_token);
      setUserId(userIdLocal);
      setTokenExpiration(tokenExp);
    }
    const _cartItems = JSON.parse(localStorage.getItem("cart-items"));
    if (_cartItems && _cartItems.length > 0) {
      setCartItems(_cartItems);
    }
  }, [test]);

  const login = (token, userId, tokenExpiratopn) => {
    setToken(token);
    setUserId(userId);
    setTokenExpiration(tokenExpiratopn);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
  };

  const addItemToCart = (product) => {
    let exist = false;
    const newState =
      cartItems &&
      cartItems.map((cartItem) => {
        if (cartItem._id === product._id) {
          exist = true;
          return {
            ...cartItem,
            quantity: product.quantity,
          };
        }
        return cartItem;
      });
    if (exist) {
      console.log(newState);
      setCartItems(newState);
      localStorage.setItem("cart-items", JSON.stringify(newState));
    } else {
      localStorage.setItem(
        "cart-items",
        JSON.stringify([...cartItems, product])
      );
      setCartItems([...cartItems, product]);
    }
  };

  const removeItemFromCart = (id) => {
    let _cartItems = [...cartItems];
    let index = _cartItems.findIndex((cart) => cart._id === id);
    _cartItems.splice(index, 1);
    localStorage.setItem("cart-items", JSON.stringify(_cartItems));
    setCartItems(_cartItems);

    setTest(id);
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          token,
          userId,
          tokenExpiration,
          login,
          logout,
        }}
      >
        <CartContext.Provider
          value={{
            cartItems,
            addItemToCart,
            removeItemFromCart,
          }}
        >
          <div className="app">
            <Toaster />
            {/* <TopHeader shippingMessage="Free shipping on all orders over $50" /> */}
            {/* <MiddleHeader /> */}
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/search" component={Search} />
              <Route path="/contact" component={Contact} />
              <Route path="/faqs" component={Faqs} />
              {!token && <Route path="/login" component={Login} />}
              {!token && <Route path="/register" component={Register} />}

              <Route path="/error-404" component={Error404} />
              <Route path="/tracking-order" component={TrackingOrder} />
              <Route path="/terms-of-service" component={TermsOfService} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/shop/:keyword" component={Shop} />
              <Route exact path="/page/:pageNumber" component={Shop} />
              <Route
                exact
                path="/search/:keyword/page/:pageNumber"
                component={Shop}
              />
              <Route path="/cart" component={Cart} />
              <Route path="/order" component={Orders} />
              <Route path="/checkout" component={Checkout} />
              <Route
                path="/products-details/:productId"
                component={ProductsDetails}
              />
              <Route path="/coming-soon" component={ComingSoon} />
              {token && <Route path="/profile" component={User} />}
              {token && <Route path="/products" component={Products} />}
              {token && <Route path="/categories" component={Categories} />}
              {token && <Route path="/reset" component={ResetPassword} />}
            </Switch>
          </div>
        </CartContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
