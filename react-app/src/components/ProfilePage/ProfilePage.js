import React,{useState} from "react";
import { useSelector } from "react-redux";
import EmptyProfilePic from "../../images/EmptyProfile.png"
import ProfileEditForm from "../Forms/ProfileEditForm";

// Style
import "./ProfilePage.css"

function ProfilePage(){
    const user = useSelector((x) => x.session.user)

    const [editImage, setEditImage] = useState(false);


    return (
        <>
        <div className="user__profile">
            <div className="profile__heading">
                <h1>Welcome to your Profile Page, {user.username}</h1>
            </div>
            <div className="profile__image">
                <img src={EmptyProfilePic} alt="default profile pic"></img>
                <button type="button" onClick={() => setEditImage(true)}></button>
            </div>
            {   editImage &&
            (
                <ProfileEditForm setEditImage={setEditImage}/>
            )

            }
            
            <div className="profile__bio">
                <h2>Bio</h2>
                <p>Biography Details</p>
            </div>
        </div>
        <div className="user__reviews">
            <h2>User Reviews</h2>
            <div className="review__card">
                <h3>Review</h3>
            </div>
        </div>
        <div className="user__likes">
            <h2>User Likes</h2>
                <div className="like__card">
                    <h3>Like</h3>
                </div>
        </div>
        </>
    )
}

export default ProfilePage;