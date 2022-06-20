import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import "./TopHeader.css";

function TopHeader({ shippingMessage, history }) {
  const context = useContext(AuthContext);

  const handleLogout = () => {
    context.logout();
    history.push("/login");
  };

  return (
    <div className="top-header-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="top-header-content">
              <span>
                <i className="flaticon-check"></i>
                {shippingMessage}
              </span>
            </div>
          </div>

          <div className="col-lg-6 text-right">
            <ul className="top-header-optional">

              <li>
                <i className="bx bxs-lock-alt"></i>
                <span>
                  {!context.token && <Link to="/login">Login</Link>} Or{" "}
                  {!context.token && <Link to="/register">Register</Link>}
                  {context.token && (
                    <button className="logout-btn btn btn-primary" onClick={handleLogout}>
                      Logout
                    </button>
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(TopHeader);
