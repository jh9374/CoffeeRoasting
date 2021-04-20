import React, { useState } from "react";


// Styling
import "./FrontPage.css"

// Images
import toast_color from "../../images/toast_color.png";
import coffeeRoasting from "../../images/coffeeRoasting.png"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function FrontPage() {

    return (
        <>
            <div className="frontpage">
                <div className="frontpage__banner">
                    <h2 className="frontpage__heading">
                        Ready to "Roast" or "Toast"?
                    </h2>
                    <p className="frontpage__text">Find coffee roasters, review, and purchase</p>
                    <NavLink to="/products" className="products__button">Start Roasting</NavLink>
                </div>
                {/* <div className="frontpage__cards">
                    <img className="roast__image" src={coffeeRoasting} alt="coffee roasting" />
                    <img className="toast__image" src={toast_color} alt="toast" />
                </div> */}
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
        </>
    )
}

export default FrontPage;