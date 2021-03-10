import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ProfileEditForm.css"
import {updateProfile} from "../../store/reducers/files"

function ProfileEditForm({setEditImage}){

    const dispatch = useDispatch();

    // user from redux state
    const user = useSelector((x) => x.session.user)

    // form state
    const [file, setFile] = useState("");
    const [bio, setBio] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [usState, setUSState] = useState("")
    const [zipcode, setZipcode] = useState("");

    function submit(e){
        e.preventDefault();
        const profileForm = {
            id: user.id,
            file:file[0],
            bio,
            street,
            city,
            usState,
            zipcode
        }
        console.log(profileForm)
        const res = dispatch(updateProfile(profileForm));
    }

    const updateImage = (e) => {
        const file = e.target.files;
        setFile(file);
    }

    return(
        <div className="profile-form__container">
            <div>
                <button type="button" className="public__form--close" onClick={() => setEditImage(false)}>X</button>
            </div>
            <form className="profile__form" onSubmit={submit}>
                <div className="profile__input">
                    <label>Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}></input>
                </div>
                <div className="profile__input">
                    <label>Bio</label>
                    <textarea
                        placeholder="Bio Details"
                        onChange={(e) => setBio(e.target.value)}></textarea>
                </div>
                <div className="profile__input profile-shipping__input">
                    <h2>Shipping Address</h2>
                    <label>Street Address</label>
                    <input type="text"
                        onChange={(e) => setStreet(e.target.value)}></input>
                    <label>City</label>
                    <input type="text"
                        onChange={(e) => setCity(e.target.value)}></input>
                    <label>State</label>
                    <select name="state" value={usState} id="state" onChange={(e) => setUSState(e.target.value)} >
                        <option value="">Select a State</option>
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
                    <input type="text"
                    inputMode="numeric"
                    placeholder="Five digit zip code"
                    pattern="\d{5}"
                    onChange={(e) => setZipcode(e.target.value)}></input>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditForm;