import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { setSessionUser } from "../../store/reducers/session";
import { useDispatch } from "react-redux";

import "./LoginForm.css"

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setSessionUser(user));
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/products" />;
  }

  return (
    <form className="form-login" onSubmit={onLogin}>
      <div className="form-login__heading">
        <h2>Login</h2>
      </div>
      <div style={errors.length > 0 ? { display: "block" } : { display: "none" }}>
        {errors.map((error) => (
          <div key={error} className="form-login__errors" style={{margin:"auto",padding:"0"}}>{error}</div>
        ))}
      </div>
      <div className="form-login__input">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="form-login__input">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className="form-login__submit">
        <button type="submit">Login</button>
      </div>
      <div className="form-login__signup" style={{ justifyContent: "center" }}>
          Don't have an account?
          <NavLink to="/sign-up">Sign Up</NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
