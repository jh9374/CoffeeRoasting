import React from "react";
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { removeSessionUser } from "../../store/reducers/session"
import { NavLink } from "react-router-dom";

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await logout();
    dispatch(removeSessionUser());
    setAuthenticated(false);
  };

  return <NavLink to="/" onClick={onLogout}>Logout</NavLink>;
};

export default LogoutButton;