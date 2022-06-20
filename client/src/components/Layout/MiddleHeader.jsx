import { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import logo from "../../assets/img/logo.png";
import "./MiddleHeader.css";

function MiddleHeader({ history }) {
  const context = useContext(CartContext);
  const Aucontext = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/shop/${keyword}`);
    } else {
      history.push("/");
    }
  };

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

          <div className="col-lg-3">
            <ul className="middle-header-optional">
              {Aucontext.token &&
                <li>
                  <Link to="/wishlist">
                    <i className="flaticon-heart"></i>
                  </Link>
                </li> 
              }
              <li>
                <Link to="/cart">
                  <i className="flaticon-shopping-cart"></i>
                  {context.cartItems && context.cartItems.length > 0 && (
                    <span>{context.cartItems.length}</span>
                  )}
                </Link>
              </li>
              <li>
                $
                {context.cartItems &&
                  context.cartItems.reduce((count, curItem) => {
                    return (
                      count +
                      parseInt(curItem.price) * parseInt(curItem.quantity || 0)
                    );
                  }, 0)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MiddleHeader);
