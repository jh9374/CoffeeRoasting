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

function App() {

  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      console.log(user)
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
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} >
          <FrontPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
