import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import LogoutButton from '../auth/LogoutButton';

// Styling
import "./NavBar.css";

// Media
import homeIcon from "../../images/coffeeRoasting.png"
import { AiFillCaretDown, AiFillCaretUp} from "react-icons/ai"

const NavBar = ({ setAuthenticated }) => {
  const user = useSelector((x) => x.session.user);
  const [showCart, setShowCart] = useState(false);
  return (
    <div className="navbar">
      <nav className="navbar__nav">
        <div className="navbar__home home">
          <NavLink className="home__link" to="/" exact={true} activeClassName="active">
            <div>
              <img className="home__image" src={homeIcon} alt="page logo" />
              <div className="home__text">
                <span>Coffee Roasting</span>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="navbar-auth__links">
          {user.id == null ? (
            <>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
            </NavLink>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
            </NavLink>
            </>
          ):(
            <>
            <span className="navbar__username">
              Welcome {user.username}
            </span>
            <NavLink to={`/profile/${user.username}`} exact={true} activeClassName="active">
                Profile
            </NavLink>
          <NavLink to="/cart" exact={true} activeClassName="active"
                  onMouseEnter={() => { setShowCart(true) }}
                  >
                  Cart
                  <span className="cart__count">0</span>
                  <span className="cart__caretdown"
                  
                  style={!showCart ? {visibility:"visible"} : {visibility:"hidden"}}
                  ><AiFillCaretDown/></span>
                  <span className="cart__caretup"
                    style={showCart ? { visibility: "visible" } : { visibility: "hidden" }}>
                      <AiFillCaretUp /></span>
                  {showCart && (
                    <div className="cart__dropdown"
                      onMouseEnter={() => { setShowCart(true) }}
                      onMouseLeave={() => { setShowCart(false) }}>
                      Cart Items
                      <div className="cart__items">
                        <ul>
                          <li className="cart__item">
                            <span>Item Name</span>
                            <span>Qty</span>
                            <span>Price</span>
                          </li>
                          <li className="cart__item">
                            <span>Item Name</span>
                            <span>Qty</span>
                            <span>Price</span>
                          </li>
                          <li className="cart__item">
                            <span>Item Name</span>
                            <span>Qty</span>
                            <span>Price</span>
                          </li>
                        </ul>
                      </div>
                      <div className="cart__subtotal">
                        <span>Subtotal</span>
                        <span>$0.00</span>
                      </div>
                      <button className="cart__checkout">Checkout</button>
                    </div>
                  )}
                </NavLink>
                
                <LogoutButton setAuthenticated={setAuthenticated}>  </LogoutButton>
            </>
            )}
        </div>
      </nav>
    </div>

  );
}

export default NavBar;