import React, { useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';

import "./SignUpForm.css"

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to={`/products`} />;
  }

  return (
    <form className="form-signup" onSubmit={onSignUp}>
      <div className="form-signup__heading">
        <h2>Sign Up</h2>
      </div>
      <div className="form-signup__input">
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="form-signup__input">
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="form-signup__input">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="form-signup__input">
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="form-signup__submit">
        <button type="submit">Sign Up</button>
      </div>
      <div className="form-signup__login" style={{justifyContent:"center"}}>
        Already have an account?
          <NavLink to="/login">Login</NavLink>
      </div>
    </form>
  );
};

export default SignUpForm;
