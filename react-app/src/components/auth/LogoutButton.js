import React from "react";
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { removeSessionUser } from "../../store/reducers/session"

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await logout();
    dispatch(removeSessionUser());
    setAuthenticated(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
