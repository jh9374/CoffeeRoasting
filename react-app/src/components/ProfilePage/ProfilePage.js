import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// Thunks
import { getUserProfile } from "../../services/profile"

// Forms
import RoasterRegisterForm from "../Forms/RoasterRegisterForm";
import ProfileEditForm from "../Forms/ProfileEditForm";

// Other Assets
import EmptyProfilePic from "../../images/EmptyProfile.png"
import "./ProfilePage.css"
import ReviewCard from "../ReviewCard/ReviewCard";


function ProfilePage() {
    const history = useHistory();
    const { id } = useParams();

    const user = useSelector((x) => x.session.user)

    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState({});
    const [register, setRegister] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const res = await getUserProfile(id)
            if (!res.errors) {
                setProfile(res)
                setIsLoading(false)
            } else {
                history.push("/404")
            }
        }
        fetchUserProfile();
    }, [toggleEditForm, id, reload])

    function openForm(e) {
        e.preventDefault();
        setRegister(!register);
    }

    if (!isLoading) {
        return (
            <div className="user__profile">
                <div className="profile__heading">
                    <h1>{profile.username}</h1>
                </div>
                <div className="profile__image">
                    <img src={profile.profile_image_url ? profile.profile_image_url : EmptyProfilePic} alt="default profile pic"></img>
                    {
                        user.id === profile.id &&
                        <div>
                            <button className="editProfile__button" type="button" onClick={() => setToggleEditForm(true)}></button>
                        </div>

                    }
                </div>

                {toggleEditForm &&
                    (
                        <ProfileEditForm toggleEditForm={toggleEditForm} setToggleEditForm={setToggleEditForm} />
                    )

                }

                <div className="profile__bio">
                    <h2>Bio:</h2>
                    <p>{profile.bio}</p>
                </div>
                {
                    user.id === profile.id &&
                    (
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
                    {
                        profile.reviews ?
                            (
                                Object.keys(profile.reviews).map((r) => {
                                    return <ReviewCard key={r} setReload={setReload} review={profile.reviews[r]} />
                                })

                            )
                            :
                            (
                                <div className="review__card">
                                    <h3>No Reviews Yet</h3>
                                </div>
                            )

                    }

                </div>
                {/* <div className="user__likes">
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
                </div> */}
                {
                    !user.roaster &&
                    (
                        !register ?
                            (
                                <div>
                                    <button className="roaster-register__button"
                                        onClick={openForm}>Register as a Roaster?</button>
                                </div>
                            )
                            :
                            (
                                <>
                                    <div>
                                        <button className="roaster-register__button roaster-register__button--close"
                                            onClick={openForm}>Nevermind</button>
                                    </div>
                                    <RoasterRegisterForm />
                                </>
                            )
                    )
                }
            </div>
        )
    } else {
        return (<div>Loading</div>)
    }

}

export default ProfilePage;