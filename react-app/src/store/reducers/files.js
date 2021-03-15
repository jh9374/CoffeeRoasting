// // Action Constants
//     const CREATE_PROFILE = "profile/createProfile";
//     const UPDATE_PROFILE = "profile/updateProfile";

// // Action Creators

// const createProfileAction = (payload) => ({
//     type: CREATE_PROFILE,
//     payload
// });

// const updateProfileAction = (payload) => ({
//     type: UPDATE_PROFILE,
//     payload
// });

// State Template
// const profile

// Thunks
export const updateProfile = (profileForm) => async (dispatch) => {
    const {
        id,
        file,
        bio,
        street,
        city,
        usState,
        zipcode
    } = profileForm;
    const form = new FormData()

    form.append('file', file);
    form.append('bio', bio)
    form.append('street_address', street)
    form.append('city', city)
    form.append('state', usState)
    form.append('zipcode', zipcode)

    const res = await fetch(`/api/profile/${id}`, {
        method: "PATCH",
        body: form,
    })
    return res;
}