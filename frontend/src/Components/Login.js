import React from "react";
import "./Login.css";

function Login(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onLogin();
  };

  return (
    <>
      <div>
        <img id="Image" src="ImageLogin.png" alt="Login" />
      </div>
      <div className="login-box">
        <p id="title-login">Login</p>
        <hr id="underline" />
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="username"
              className="input-field"
              placeholder="Username"
            />
            <hr/>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Password"
            />
            <hr/>
          </div>
          <p id="forgotpsw">Forgot password?</p>
          <button id="login" type="submit">
            <strong id="LOGIN">LOGIN</strong>
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
