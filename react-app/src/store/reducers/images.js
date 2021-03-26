const GET_IMAGES = "images/getImages"

const getImagesAction = (payload) => ({
    type: GET_IMAGES,
    payload
});

export const getImages = () => async (dispatch) => {
    let res = await fetch('/api/images',{})
    res = await res.json()
    dispatch(getImagesAction(res));
    return res;
}

const reducer = (state = {}, {type, payload}) => {
    let stateCopy;
    switch (type) {
        case GET_IMAGES:
            stateCopy = { ...state, ...payload}
            return state = stateCopy;
        default:
            return state;
    }
}

export default reducer;