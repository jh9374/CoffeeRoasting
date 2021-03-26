import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

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

    const [showReviews, setShowReviews] = useState(true);
    const [showLikes, setShowLikes] = useState(false);
    const [showRoaster, setShowRoaster] = useState(false);


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
            <div className="profile__page">
                <div className="user__profile">
                    <div className="profile__details">

                        <div className="profile__image">
                            <img src={profile.profile_image_url ? profile.profile_image_url : EmptyProfilePic} alt="default profile pic"></img>
                            <div className="profile__name">
                                <h1>{profile.username}</h1>
                            </div>
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
                        <div className="user__info">

                            <div className="profile__bio">
                                <p>{profile.bio}</p>
                            </div>
                            {
                                user.id === profile.id &&
                                (
                                    <div className="profile-shipping__details">
                                        <h2>Shipping Info</h2>
                                        <div>
                                            <div className="shipping__detail">
                                                {profile.street_address}
                                            </div>
                                            <div className="shipping__detail">
                                                {profile.city} {profile.state}, {profile.zipcode}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="user__reviews">
                        <div className="user__options">
                            <div className={showReviews ? 'profile__tab--active reviews-container__heading' : 'reviews-container__heading'} onClick={() => {
                                setShowReviews(true);
                                setShowLikes(false);
                                setShowRoaster(false);
                            }}>
                                <h2>User Reviews</h2>
                            </div>
                            <div className={showLikes ? 'profile__tab--active reviews-container__heading' : 'reviews-container__heading'} onClick={() => {
                                setShowReviews(false);
                                setShowLikes(true);
                                setShowRoaster(false);
                            }}>
                                <h2>User Likes</h2>
                            </div>
                            {
                                profile.roaster &&
                                (
                                    <div className={showRoaster ? 'profile__tab--active reviews-container__heading' : 'reviews-container__heading'} onClick={() => {
                                        setShowReviews(false);
                                        setShowLikes(false);
                                        setShowRoaster(true);
                                    }}>
                                        <h2>Roastery</h2>
                                    </div>
                                )
                            }

                        </div>


                        {
                            showReviews &&
                            (
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
                            )
                        }

                    </div>
                    <div className="user__likes">
                        {/* <div className="likes-container__heading">
                            <h2>User Likes</h2>
                        </div> */}

                        {
                            showLikes &&
                            (
                                profile.likes ?
                                    (
                                        Object.keys(profile.likes).map((l) => {
                                            return <ReviewCard key={l} setReload={setReload} review={profile.likes[l]} />
                                        })

                                    )
                                    :
                                    (
                                        <div className="likes__card">
                                            <h3>No Likes Yet</h3>
                                        </div>
                                    )
                            )
                        }

                    </div>
                    {
                        showRoaster &&
                        (
                            !user.roaster ?
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
                                :
                                (
                                    <div className="roaster__card">
                                        <Link to={`/roasters/${profile.roaster_id}`} >Roaster Profile</Link>
                                    </div>
                                )
                        )
                    }
                </div>
            </div>
        )
    } else {
        return (<div>Loading</div>)
    }

}

export default ProfilePage;