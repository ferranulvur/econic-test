import { useState, useContext } from "react";
import { NavLink, Link, withRouter, useLocation } from "react-router-dom";

import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import logo from "../../assets/img/logo.png";
import "./MiddleHeader.css";

const pagesRoutes = [
  "/about",
  "/our-team",
  "/pricing-plans",
  "/search",
  "/contact",
  "/faqs",
  "/login",
  "/register",
  "/my-account",
  "/error-404",
  "/tracking-order",
  "/terms-of-service",
  "/privacy-policy",
];
const shopRoutes = ["/shop", "/cart", "/checkout", "/products-details"];

function MiddleHeader({ history }) {
  const { pathname } = useLocation();
  const context = useContext(CartContext);

  return (
    <div className="middle-header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="middle-header-logo">
              <Link to="/">
                <img src={logo} alt="image" href="/" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <li className="nav-item megamenu">
              <NavLink
                to="/about"
                isActive={() => pagesRoutes.includes(pathname)}
                className="nav-link"
              >
                Pages
                <i className="bx bx-chevron-down chevron-display"></i>
                <span className="plus_icon">+</span>
              </NavLink>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <ul className="megamenu-submenu">
                          <li>
                            <NavLink to={"/about"} className="nav-link">
                              About Us
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to={"/search"} className="nav-link">
                              Search
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to={"/contact"} className="nav-link">
                              Contact Us
                            </NavLink>
                          </li>
                        </ul>
                      </div>

                      <div className="col">
                        <ul className="megamenu-submenu">
                          <li>
                            <NavLink to={"/faqs"} className="nav-link">
                              FAQ's
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to="/my-account" className="nav-link">
                              My Account
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to="/error-404" className="nav-link">
                              404 Error
                            </NavLink>
                          </li>
                        </ul>
                      </div>

                      <div className="col">
                        <ul className="megamenu-submenu">
                          <li>
                            <NavLink to="/tracking-order" className="nav-link">
                              Tracking Order
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/terms-of-service"
                              className="nav-link"
                            >
                              Terms Of Service
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to="/privacy-policy" className="nav-link">
                              Privacy Policy
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to="/coming-soon" className="nav-link">
                              Coming Soon
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink
                to="/shop"
                isActive={() => shopRoutes.includes(pathname)}
                className="nav-link"
              >
                Shop <i className="bx bx-chevron-down chevron-display"></i>
                <span className="plus_icon">+</span>
              </NavLink>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink to="/shop" className="nav-link">
                    Shop
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/shop-list-view" className="nav-link">
                    Shop List View
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/shop-left-sidebar" className="nav-link">
                    Shop Left Sidebar
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/shop-right-sidebar" className="nav-link">
                    Shop Right Sidebar
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/shop-full-width" className="nav-link">
                    Shop Full Width
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/checkout" className="nav-link">
                    Checkout
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MiddleHeader);
