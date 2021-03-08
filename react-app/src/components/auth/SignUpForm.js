import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { setSessionUser } from "../../store/reducers/session";

import "./SignUpForm.css"

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);
    const user = await signUp(username, email, password, repeatPassword);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setSessionUser(user))
      history.push(`/profile/${user.id}`)
    } else{
      setErrors(user.errors)
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
      <div style={errors.length > 0 ? { display: "block" } : { display: "none" }}>
        {errors.map((error) => (
          <div key={error} className="form-login__errors" style={{ margin: "auto", padding: "0" }}>{error}</div>
        ))}
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
