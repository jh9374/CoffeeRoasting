import React, { useState } from "react";


// Styling
import "./FrontPage.css"

// Images
import toast_color from "../../images/toast_color.png";
import coffeeRoasting from "../../images/coffeeRoasting.png"
import { NavLink, useHistory } from "react-router-dom";

function FrontPage() {

    return (
        <>
            <div className="frontpage">
                <div className="frontpage__banner">
                    <div className="frontpage__text">
                        Ready to "Roast" or "Toast"?
                </div>
                <div className="search__wrapper">
                    <NavLink to="/products">Look at coffee</NavLink>
                </div>
                </div>
                <div className="frontpage__images">
                    <img className="roast__image" src={coffeeRoasting} alt="coffee roasting" />
                    <img className="toast__image" src={toast_color} alt="toast" />
                </div>
            </div>
            <footer>
                <div>
                    <a href="https://github.com/jh9374">
                        Github</a></div>
                <div>
                    <a href="https://www.linkedin.com/in/jchc">LinkedIn</a></div>
            </footer>
        </>
    )
}

export default FrontPage;