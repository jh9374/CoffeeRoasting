// React imports
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// Components
import FrontPage from "./components/FrontPage/FrontPage"
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar.js";
import SingleProductPage from "./components/SingleProductPage/SingleProductPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import RoasterProfilePage from "./components/RoasterProfilePage/RoasterProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Services and Actions
import { authenticate } from "./services/auth";
import { setSessionUser } from "./store/reducers/session";
import { getProducts } from "./store/reducers/product";
import { getImages } from "./store/reducers/images";
import { getRoasters } from "./store/reducers/roasters";


function App() {

  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        await dispatch(setSessionUser(user));
      }
      await dispatch(getProducts())
      await dispatch(getImages())
      await dispatch(getRoasters())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <div className="page__container" >

      
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
      </div>
      <footer>
        <div>
          <a className="footer__icons" href="https://github.com/jh9374">
            < FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <div>
          <a className="footer__icons" href="https://www.linkedin.com/in/jchc">
            < FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
