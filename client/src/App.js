import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Search from './pages/About/Search';
import Login from "./pages/Authentications/Login";
import Register from "./pages/Authentications/Register";
import ResetPassword from "./pages/Authentications/ResetPassword";
import Contact from "./pages/About/Contact";
import Faqs from "./pages/About/Faqs";
import Error404 from "./pages/About/Error-404";
import TrackingOrder from "./pages/About/TrackingOrder";
import Compare from "./pages/About/Compare";
import TermsOfService from "./pages/About/TermsOfService";
import PrivacyPolicy from "./pages/About/PrivacyPolicy";
import MyAccount from "./pages/About/MyAccount";
import Shop from "./pages/Shop/Shop";
import ShopListView from "./pages/Shop/ShopListView";
import ShopLeftSidebar from "./pages/Shop/ShopLeftSidebar";
import ShopRightSidebar from "./pages/Shop/ShopRightSidebar";
import ShopFullWidth from "./pages/Shop/ShopFullWidth";
import Cart from "./pages/Shop/Cart";
import Orders from "./pages/Shop/Orders";
import WishList from "./pages/Shop/WishList";
import Checkout from "./pages/Shop/Checkout";
import ProductsDetails from "./pages/Shop/ProductsDetails";
import Blog from "./pages/Blog/Blog";
import BlogListView from "./pages/Blog/BlogListView";
import BlogLeftSidebar from "./pages/Blog/BlogLeftSidebar";
import BlogRightSidebar from "./pages/Blog/BlogRightSidebar";
import BlogFullWidth from "./pages/Blog/BlogFullWidth";
import BlogDetails from "./pages/Blog/BlogDetails";
import AddProduct from "./pages/Products/AddProduct";
import User from "./pages/User/User";
import Products from "./pages/Products/Products";
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
  const [test,setTest] = useState(null);

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
            <MiddleHeader />
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/search" component={Search} />
              <Route path="/contact" component={Contact} />
              <Route path="/faqs" component={Faqs} />
              {!token && <Route path="/login" component={Login} />}
              {!token && <Route path="/register" component={Register} />}

              <Route path="/my-account" component={MyAccount} />
              <Route path="/error-404" component={Error404} />
              <Route path="/tracking-order" component={TrackingOrder} />
              <Route path="/compare" component={Compare} />
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
              <Route path="/shop-list-view" component={ShopListView} />
              <Route path="/shop-left-sidebar" component={ShopLeftSidebar} />
              <Route path="/shop-right-sidebar" component={ShopRightSidebar} />
              <Route path="/shop-full-width" component={ShopFullWidth} />
              <Route path="/cart" component={Cart} />
              <Route path="/order" component={Orders} />
              <Route path="/wishlist" component={WishList} />
              <Route path="/checkout" component={Checkout} />
              <Route
                path="/products-details/:productId"
                component={ProductsDetails}
              />
              <Route path="/blog" component={Blog} />
              <Route path="/blog-list-view" component={BlogListView} />
              <Route path="/blog-left-sidebar" component={BlogLeftSidebar} />
              <Route path="/blog-right-sidebar" component={BlogRightSidebar} />
              <Route path="/blog-full-width" component={BlogFullWidth} />
              <Route path="/blog-details" component={BlogDetails} />
              <Route path="/coming-soon" component={ComingSoon} />
              {token && <Route path="/add-product" component={AddProduct} />}
              {token && <Route path="/profile" component={User} />}
              {token && <Route path="/products" component={Products} />}
              {token && <Route path="/reset" component={ResetPassword} />}
            </Switch>
          </div>
        </CartContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
