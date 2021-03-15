import React from "react";

// Styling
import "./FrontPage.css"

// Images
import toast_color from "../../images/toast_color.png";
import coffeeRoasting from "../../images/coffeeRoasting.png"

function FrontPage(){
    return (
        <>
        <div className="frontpage">
            <div className="frontpage__banner">
                <div className="frontpage__text">
                    Ready to "Roast" or "Toast"?
                </div>
            </div>
            <div className="frontpage__images">
                <img className="roast__image" src={coffeeRoasting} alt="coffee roasting" />
                <img className="toast__image" src={toast_color} alt="toast" />
            </div>
        </div>
        <footer>
            <div>Github</div>
            <div>LinkedIn</div>
        </footer>
        </>
    )
}

export default FrontPage;