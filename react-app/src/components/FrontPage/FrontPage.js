import React, { useState } from "react";


// Styling
import "./FrontPage.css"

// Images
import toast_color from "../../images/toast_color.png";
import coffeeRoasting from "../../images/coffeeRoasting.png"
import { useHistory } from "react-router-dom";

function FrontPage() {
    const history = useHistory();
    const [search, setSearch] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        // query for coffee based on name
        // go to products page
        history.push("/products")
    }
    return (
        <>
            <div className="frontpage">
                <div className="frontpage__banner">
                    <div className="frontpage__text">
                        Ready to "Roast" or "Toast"?
                </div>
                <div className="search__wrapper">
                    <form className="search__form" onSubmit={handleSubmit}>
                        <div className="search-text__wrapper">
                            <h2 className="search__text">
                                Search for Coffee
                            </h2>
                        </div>
                        <div className="input__wrapper">
                            <input
                                value={search}
                                placeholder="Counter Culture"
                                onChange={(e) => setSearch(e.target.value)}
                                className="search__input">
                            </input>
                        </div>
                        <div className="submit__wrapper">
                            <button
                                type="submit"
                                className="search__button">
                            </button>
                        </div>
                    </form>
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