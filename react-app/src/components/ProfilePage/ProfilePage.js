import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyProfilePic from "../../images/EmptyProfile.png"
import ProfileEditForm from "../Forms/ProfileEditForm";
import { getUserProfile } from "../../services/profile"

// Style
import "./ProfilePage.css"
import { useHistory, useParams } from "react-router-dom";
import RoasterRegisterForm from "../Forms/RoasterRegisterForm";

function ProfilePage() {
    const history = useHistory();
    const { username } = useParams();
    const user = useSelector((x) => x.session.user)

    const [editImage, setEditImage] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState({});
    const [register, setRegister] = useState(false);

    const fetchUserProfile = useCallback(async () => {
        const res = await getUserProfile(username)
                if (!res.errors) {
                    setProfile(res)
                    setIsLoading(false)
                } else {
                    history.push("/404")
                }
            
    }, [ history])

    useEffect(() => {
        setIsLoading(true)
        fetchUserProfile();
    }, [editImage])

    function openForm(e) {
        e.preventDefault();
        setRegister(!register);
    }

    if (!isLoading) {
        return (
            <>
                <div className="user__profile">
                    <div className="profile__heading">
                        <h1>{profile.username}{profile.id}{user.id}</h1>
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
                                    {profile.street_address}
                                </div>
                                <div>
                                    {profile.city} {profile.state}, {profile.zipcode}
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
                    {
                        !register ?
                            (<div>
                                <button className="roaster-register__button"
                                    onClick={openForm}>Register as a Roaster?</button>
                            </div>)
                            :
                            (<div>
                                <button className="roaster-register__button roaster-register__button--close"
                                    onClick={openForm}>Nevermind</button>
                            </div>)
                    }

                    {
                        register &&
                        <RoasterRegisterForm />
                    }
                </div>

            </>
        )
    } else {
        return (<div>Loading</div>)
    }

}

export default ProfilePage;