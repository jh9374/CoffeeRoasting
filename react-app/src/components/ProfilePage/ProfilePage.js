import React,{useState} from "react";
import { useSelector } from "react-redux";
import EmptyProfilePic from "../../images/EmptyProfile.png"

// Style
import "./ProfilePage.css"

function ProfilePage(){
    const user = useSelector((x) => x.session.user)

    const [editImage, setEditImage] = useState(false);


    return (
        <div className="profile">
            <div className="profile__heading">
                <h1>Welcome to your Profile Page, {user.username}</h1>
            </div>
            <div className="profile__image">
                <img src={EmptyProfilePic} alt="default profile pic"></img>
                <button type="button" onClick={() => setEditImage(true)}></button>
            </div>
            {   editImage &&
            (
                <div className="profile-form__container">
                    <button type="button" onClick={() => setEditImage(false)}>X</button>
                    <form className="profile__form">
                        <div className="profile__input">
                            <label>Profile Image</label>
                            <input
                            type="file"
                            accept="image/*"></input>
                        </div>
                        <div className="profile__input">
                            <label>Bio</label>
                            <textarea
                            defaultValue="Bio Details"></textarea>
                        </div>
                        <div className="profile__input profile-shipping__input">
                            <label>Street Address</label>
                            <input type="text"></input>
                            <label>City</label>
                            <input type="text"></input>
                            <label>State</label>
                            <select name="state" id="state" >
                                <option value="" selected="selected">Select a State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                            <label>Zipcode</label>
                            <input type="text" inputMode="numeric" placeholder="Five digit zip code" pattern="\d{5}"></input>
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )

            }
            
            <div className="profile__bio">
                <h2>Bio</h2>
                <p>Biography Details</p>
            </div>
        </div>
    )
}

export default ProfilePage;