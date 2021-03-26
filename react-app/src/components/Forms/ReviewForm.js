import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createUserReview, deleteUserReview, updateUserReview } from "../../services/reviews";
// Images
import toast_color from "../../images/toast_color.png";
import coffeeRoasting from "../../images/coffeeRoasting.png"

function ReviewForm({productId, setReload}){

    const [reviewInput, setReviewInput] = useState();
    const [roastRatingInput, setRoastRatingInput] = useState(5)
    const user = useSelector((x) => x.session.user)


    async function createReview(e, id) {
        e.preventDefault();
        const newReview = {
            "product_id": productId,
            "user_id": user.id,
            "content": reviewInput,
            "roast_rating": roastRatingInput
        }
        const res = await createUserReview(newReview);
        if (res.status == 200) {
            
            
        }
        setReviewInput("")
        setRoastRatingInput(5)
        setReload(true)
        
    }

    return (
        <div className="review__card new__review">
            <div className="review__heading">
                <h2>Add a review</h2>
            </div>
            <form className="review__form" onSubmit={(e) => createReview(e, productId)}>
                <div>
                    <textarea
                        value={reviewInput}
                        placeholder="Begin writing here"
                        onChange={(e) => setReviewInput(e.target.value)}>
                    </textarea>
                </div>
                <div >
                    <div className="review__heading"><label>Roast Rating</label></div>
                    <div className="roastRating__container">
                        <img className="review-form-roast__image" src={coffeeRoasting} alt="coffee roasting" />
                        <div className="roastRating-input__container">
                            <input
                                className="roastRating__input"
                                type="range"
                                min="0"
                                max="10"
                                list="roastLevels"
                                value={roastRatingInput}
                                onChange={(e) => setRoastRatingInput(parseInt(e.target.value))}></input>
                            <datalist id="roastLevels">
                                <option value="0" label="0" ></option>
                                <option value="1" label="1" ></option>
                                <option value="2" label="2" ></option>
                                <option value="3" label="3" ></option>
                                <option value="4" label="4" ></option>
                                <option value="5" label="5" ></option>
                                <option value="6" label="6" ></option>
                                <option value="7" label="7" ></option>
                                <option value="8" label="8" ></option>
                                <option value="9" label="9" ></option>
                                <option value="10" label="10"></option>
                            </datalist>
                        </div>
                        <img className="review-form-toast__image" src={toast_color} alt="toast" />
                    </div>


                </div>
                <div className="review__submit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
       
    )
}

export default ReviewForm;