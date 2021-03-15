import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyProfilePic from "../../images/EmptyProfile.png"
import ProfileEditForm from "../Forms/ProfileEditForm";
import { getUserProfile } from "../../services/profile"

// Style
import "./ProfilePage.css"
import { useHistory, useParams } from "react-router-dom";

function ProfilePage() {
    const history = useHistory();
    const { username } = useParams();
    const user = useSelector((x) => x.session.user)
    const [editImage, setEditImage] = useState(false);
    const [profile, setProfile] = useState();

    const fetchUserProfile = useCallback(async () => {
        const res = await getUserProfile(username)
        if (!res.errors) {
            setProfile(res)
        } else {
            history.push("/404")
        }
    }, [username, history])

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile])

    function register(e){
        e.preventDefault();
        history.push("/roaster/register")
    }

    if(profile){
        return (
            <>
                <div className="user__profile">
                    <div className="profile__heading">
                        <h1>{profile.username}</h1>
                    </div>
                    <div className="profile__image">
                        <img src={profile.profile_image_url ? profile.profile_image_url : EmptyProfilePic} alt="default profile pic"></img>
                        {
                            user.id === profile.id &&
                            <div>
                                <button className="editProfile__button" type="button" onClick={() => setEditImage(true)}></button>
                            </div>

                        }
                    </div>
                    
                    {editImage &&
                        (
                            <ProfileEditForm fetchUserProfile={fetchUserProfile} editImage={editImage} setEditImage={setEditImage} />
                        )

                    }

                    <div className="profile__bio">
                        <h2>Bio:</h2>
                        <p>{profile.bio}</p>
                    </div>
                    {
                        user.id === profile.id && (
                            <div className="shippingInfo__container">
                                <h2>Shipping Info</h2>
                                <div>
                                    {user.street_address}
                                </div>
                                <div>
                                    {user.city} {user.state}, {user.zipcode}
                                    </div>
                            </div>
                            
                        )
                    }
                    <div className="user__reviews">
                        <h2>User Reviews</h2>
                        <div className="review__card">
                            <h3>Review</h3>
                        </div>
                        <div className="review__card">
                            <h3>Review</h3>
                        </div>
                        <div className="review__card">
                            <h3>Review</h3>
                        </div>
                        <div className="review__card">
                            <h3>Review</h3>
                        </div>
                    </div>
                    <div className="user__likes">
                        <h2>User Likes</h2>
                        <div className="like__card">
                            <h3>Like</h3>
                        </div>
                        <div className="like__card">
                            <h3>Like</h3>
                        </div>
                        <div className="like__card">
                            <h3>Like</h3>
                        </div>
                        <div className="like__card">
                            <h3>Like</h3>
                        </div>
                    </div>
                    <div>
                        <button className="roaster-register__button"
                        onClick={register}>Register as a Roaster?</button>
                    </div>
                </div>
                
            </>
        )
    }else{
        return (<div>Loading</div>)
    }
    
}

export default ProfilePage;