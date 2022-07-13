import React, { useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import AuthContext from "../../contexts/auth-context";

import { listUser } from "../../redux/User/UserAction";

function LoginArea({ customClass = "", history }) {
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();
  const [alertMsg, setAlertMsg] = useState(null);
  const context = useContext(AuthContext);

  if (localStorage.getItem("token")) {
    history.push("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/user/login",
      {
        email: email.current.value,
        password: password.current.value,
      },
      config
    );

    console.log(data);

    if (data.id) {
      email.current.value = "";
      password.current.value = "";
      context.login(data.token, data.id, data.tokenExpiration);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userId", JSON.stringify(data.id));
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem(
        "tokenExpiration",
        JSON.stringify(data.tokenExpiration)
      );
      dispatch(listUser(data.id));

      setAlertMsg("Login successful");
      history.push("/");
    } else if (data.error) {
      setAlertMsg(data);
    }
  };

  return (
    <div className={"login-form" + customClass}>
      {alertMsg && console.log(alertMsg)}
      {alertMsg && alertMsg.error && (
        <div className={`alert alert-danger`} role="alert">
          {alertMsg.error}
        </div>
      )}
      {alertMsg && !alertMsg.error && (
        <div className={`alert alert-success`} role="alert">
          {alertMsg}
        </div>
      )}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            ref={email}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            ref={password}
          />
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkme"
              />
              <label className="form-check-label" htmlFor="checkme">
                Remember me
              </label>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password">
            <a href="#" className="lost-your-password">
              Forgot your password?
            </a>
          </div>
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="important-text">
        <p>
          Don't have an account? <Link to="/register">Register now!</Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(LoginArea);
