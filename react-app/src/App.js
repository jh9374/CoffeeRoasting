import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import FrontPage from "./components/FrontPage/FrontPage"
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar.js";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { setSessionUser } from "./store/reducers/session";
import { useDispatch } from "react-redux";

// Services
import { authenticate } from "./services/auth";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import RoasterProfilePage from "./components/RoasterProfilePage/RoasterProfilePage";
import { getProducts } from "./store/reducers/product";
import { getImages } from "./store/reducers/images";
import { getRoasters } from "./store/reducers/roasters";
import SingleProductPage from "./components/SingleProductPage";

function App() {

  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setSessionUser(user));
      }
      dispatch(getProducts())
      dispatch(getImages())
      dispatch(getRoasters())
      setLoaded(true);
    })();
  }, [dispatch]);

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
        <Route path="/profiles/:id" exact={true}>
          <ProfilePage />
        </Route>
        <Route path="/roasters/:id" exact={true}>
          <RoasterProfilePage />
        </Route>
        <Route path="/" exact={true} >
          <FrontPage />
        </Route>
        <Route path="/products" exact={true} >
          <ProductsPage />
        </Route>
        <Route path="/products/:id" exact={true} >
          <SingleProductPage />
        </Route>
        <Route path="/404" exact={true}>
          <h2>Not Found</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
