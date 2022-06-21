import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import logo from "../../assets/img/logo.png";
import "./Navbar.css";

const productsRoutes = ["/products", "/add-product"];


function Navbar() {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const context = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const Aucontext = useContext(AuthContext);
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/shop/${keyword}`);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    if (context && context.userId) {
      axios
        .get(`/user/${context.userId}`)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [context]);

  const toggleHotline = () => {
    setActive(!active);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 90) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, handleScroll]);

  const handleLogout = () => {
    context.logout();
    history.push("/login");
  };

  return (
    <div className={`navbar-area ${visible ? "is-sticky sticky-active" : ""}`}>
      <div className={showMenu ? "main-navbar show" : "main-navbar"}>
        <div className="mx-5 py-3 container-fluid">
          <nav className="navbar navbar-expand-md navbar-light">
          <div className="col-1">
            <div className="middle-header-logo">
              <Link to="/">
                <img src={logo} alt="image" href="/" />
              </Link>
            </div>
          </div>
            <div className={"navbar-category"}>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item respo-nav">
                    <a href="#" className="nav-link">
                      <i className="bx bx-menu"></i>
                      All Categories
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item ">
                        <Link to="/shop/semillas_cannabis" className="nav-link dark-nav-item">
                          Semillas Cannabis
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/semillas_feminizadas" className="nav-link dark-nav-item">
                          Semillas Feminizadas
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/semillas_autoflorecientes" className="nav-link dark-nav-item">
                          Semillas Autoflorecientes
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/productos_cbd" className="nav-link dark-nav-item">
                          Productos de CBD
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/merchandising" className="nav-link dark-nav-item">
                          Merchandising
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/hemp_foods" className="nav-link dark-nav-item">
                          Hemp Foods
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/vaporizadores" className="nav-link dark-nav-item">
                          Vaporizadores
                        </Link>
                      </li>

                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="middle-header-search">
                <form onSubmit={submitHandler}>
                  <div className="row align-items-center">

                    <div className="col-md-12">
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search product..."
                          name="q"
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit">
                          <i className="bx bx-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-3 d-flex justify-content-end align-items-end">
              <div className="collapse navbar-collapse mean-menu">
                <div className="others-option d-flex align-items-center">
                  <div className="option-item  respo-nav">
                    {!context.token && (
                      <a className="login-btn btn btn-primary" href="/login">
                        Login
                      </a>
                    )}
                    {context.token && (
                      <ul className="navbar-nav responsive-menu">
                        <ul className="middle-header-optional mr-4">
                          <li>
                            <Link to="/cart">
                              <i className="flaticon-shopping-cart"></i>
                              {cartContext.cartItems && cartContext.cartItems.length > 0 && (
                                <span className="text-light">{cartContext.cartItems.length}</span>
                              )}
                            </Link>
                          </li>
                          <li>
                            $
                            {cartContext.cartItems &&
                              cartContext.cartItems.reduce((count, curItem) => {
                                return (
                                  count +
                                  parseInt(curItem.price) * parseInt(curItem.quantity || 0)
                                );
                              }, 0)}
                          </li>
                        </ul>
                        {/* User Menu */}
                        {context.token && (
                          <div className="navbar-user">
                            <ul className="navbar-nav">
                              <li className="nav-item respo-nav">
                                <NavLink
                                  to=""
                                  // isActive={() => shopRoutes.includes(pathname)}
                                  className="rounded-circle btn-primary"
                                >
                                  {user && <i class="bx bxs-user"></i>}{" "}
                                </NavLink>
                                <ul className="dropdown-menu">
                                  <li className="nav-item">
                                    <NavLink to="/profile" className="nav-link dark-nav-item">
                                      Profile
                                    </NavLink>
                                  </li>
                                  <li className="nav-item">
                                    <NavLink to="/products" className="nav-link dark-nav-item">
                                      Products
                                    </NavLink>
                                  </li>
                                  <li className="nav-item">
                                    <NavLink to="/add-product" className="nav-link dark-nav-item">
                                      Add Product
                                    </NavLink>
                                  </li>
                                  <li className="nav-item">
                                    <NavLink to="/cart" className="nav-link dark-nav-item">
                                      Cart
                                    </NavLink>
                                  </li>
                                  <li className="nav-item">
                                    <NavLink to="/order" className="nav-link dark-nav-item">
                                      Order
                                    </NavLink>
                                  </li>
                                  <li className="nav-item">
                                    <NavLink to="/wishlist" className="nav-link dark-nav-item">
                                      Wishlist
                                    </NavLink>
                                  </li>
                                  <li className="nav-item">
                                    <NavLink to="/reset" className="nav-link dark-nav-item">
                                      Reset password
                                    </NavLink>
                                  </li>
                                  <hr />
                                  <li className="nav-item">
                                    <button
                                      onClick={handleLogout}
                                      className="ml-3 mb-3 btn btn-secondary "
                                    >
                                      Logout
                                    </button>
                                  </li>

                                </ul>
                              </li>
                            </ul>
                          </div>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>              
            </div>

        </nav>
      </div>
    </div>


{/* Toggle */}
      <div className="others-option-for-responsive">
        <div className="container">
          <div className="responsive-logo">
            <span>Northern Seeds</span>
          </div>
          <div className="dot-menu" onClick={() => toggleHotline()}>
            <div className="inner">
              <div className="circle circle-one"></div>
              <div className="circle circle-two"></div>
              <div className="circle circle-three"></div>
            </div>
          </div>

          <div className="hamburger-menu" onClick={() => toggleMenu()}>
            {showMenu ? (
              <span className="x-icon">x</span>
            ) : (
              <i className="bx bx-menu"></i>
            )}
          </div>

          <div className={active ? "active container" : "container"}>
            <div className="option-inner">
              <div className="others-option d-flex align-items-center">
                <div className="option-item">
                  <span>
                    Hotline:
                    <a href="tel:16545676789">(+1) 654 567 – 6789</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
