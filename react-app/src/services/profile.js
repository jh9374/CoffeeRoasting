export const getUserProfile = async(username) => {
    const response = await fetch(`/api/profiles/${username}`,{
    })
    return await response.json();
}

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

    const res = await fetch(`/api/profiles/${id}`, {
        method: "PATCH",
        body: form,
    })
    return res;
}