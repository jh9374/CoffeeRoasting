import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import FrontPage from "./components/FrontPage/FrontPage"
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar.js";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import { setSessionUser } from "./store/reducers/session";
import { useDispatch } from "react-redux";

// Services
import { authenticate } from "./services/auth";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProductPage from "./components/ProductPage/ProductPage";

function App() {

  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setSessionUser(user));
      }
      setLoaded(true);
    })();
  },[dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/profile/:username" exact={true} authenticated={authenticated}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/" exact={true} >
          <FrontPage />
        </Route>
        <Route path="/products" exact={true} >
          <ProductPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
