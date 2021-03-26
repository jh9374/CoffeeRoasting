import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteUserReview, updateUserReview } from "../../services/reviews";
import "./ReviewCard.css";
// Images
import toast_color from "../../images/toast_color.png";
import coffeeRoasting from "../../images/coffeeRoasting.png"

function ReviewCard({ review, setReload }) {

    const products = useSelector((x) => x.products)
    const user = useSelector((x) => x.session.user)

    const [toggleEdit, setToggleEdit] = useState(false);
    const [reviewInput, setReviewInput] = useState(review.content);
    const [roastRatingInput, setRoastRatingInput] = useState(review.roast_rating)

    async function deleteReview(id) {
        let res = window.confirm("Are you sure you want to delete?");
        if (res) {
            await deleteUserReview(id)
            setReload(true)
        }
    }

    async function updateReview(e,id) {
        e.preventDefault();
        const newReview = {
            "id":id,
            "product_id": review.product_id,
            "user_id": review.user_id,
            "content": reviewInput,
            "roast_rating": roastRatingInput
        }
        const res = await updateUserReview(newReview)
        if (res.errors){

        }
        setToggleEdit(false)
    }

    // useEffect(() => {

    // },[reload])

    if (products) {


        return (
            <div className="review__card">
                <div className="review__productName review__heading">
                    <h3>{products[review.product_id].name}</h3>
                    {
                        user.id === review.user_id &&
                        (
                            <>
                                <button onClick={() => { setToggleEdit(!toggleEdit) }}>{toggleEdit ? "Cancel" : "Edit"}</button>
                                <button onClick={() => deleteReview(review.id)}>Delete</button>
                            </>
                        )
                    }

                </div>
                <div className="review__text">
                    {
                        toggleEdit ?
                            (
                                <form className="review__form" onSubmit={(e) => updateReview(e,review.id)}>
                                    <div>
                                        <textarea
                                            value={reviewInput}
                                            onChange={(e) => setReviewInput(e.target.value)}>
                                        </textarea>
                                    </div>
                                    <div >
                                        <div><label>Roast Rating</label></div>
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

                            )
                            :
                            (
                                <>
                                <p>{review.content}</p>
                                 <div >
                                        <div><label>Roast Rating</label></div>
                                        <div className="roastRating__container">
                                            <img className="review-form-roast__image" src={coffeeRoasting} alt="coffee roasting" />
                                            <div className="roastRating-input__container">
                                                <meter
                                                    className="roastRating__input"
                                                    type="range"
                                                    min="0"
                                                    max="10"
                                                    low="3"
                                                    optimum="7"
                                                    high="9"
                                                    list="roastLevels"
                                                    value={roastRatingInput}
                                                    ></meter>
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
                                    </>
                            )
                    }
                </div>
            </div>

        )
    }
    return (
        <h2>No Reviews Yet</h2>
    )
}

export default ReviewCard;