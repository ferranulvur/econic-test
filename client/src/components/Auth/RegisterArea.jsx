import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function RegisterArea() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const [passwordShown, setPasswordShown] = useState(false);
  const [message, setMessage] = useState(null);

  if(localStorage.getItem("token")){
    window.location.href = "/";
  }

  const handleRegistration = async (e) => {
    e.preventDefault();

    try{

      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      }

      const {data} = await axios.post(
          'http://localhost:5000/user/register', 
          {
              username: username.current.value,
              email: email.current.value,
              password: password.current.value
          }, 
          config
      );

      console.log(data);

      if (data.message === "User created") {
        username.current.value = "";
        email.current.value = "";
        password.current.value = "";
        setMessage("Account successfully created");
      } else if (data.errors) {
        let errors = Object.values(data.errors);
        setMessage(errors);
      }


    } catch(err){
        console.log(err.response.data.message)
        setMessage(err.response.data.message)
    }
  };

  return (
    <div className={"login-form"}>
      {message &&
        (Array.isArray(message) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {message.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-success`} role="alert">
            {message}
          </div>
        ))}
      <h2>Register</h2>

      <form onSubmit={handleRegistration}>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            ref={username}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            ref={email}
            required
          />
        </div>

        <div className="form-group">
          <input
            type={passwordShown ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            ref={password}
            required
          />
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkme"
                onChange={() => setPasswordShown(!passwordShown)}
              />
              <label className="form-check-label" htmlFor="checkme">
                Show password?
              </label>
            </div>
          </div>
        </div>

        <button type="submit">Register now</button>
      </form>

      <div className="important-text">
        <p>
          Already have an account? <Link to="/login">Login now!</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterArea;
