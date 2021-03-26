const GET_ROASTERS = "images/getRoasters"

const getRoastersAction = (payload) => ({
    type: GET_ROASTERS,
    payload
});

export const getRoasters = () => async (dispatch) => {
    let res = await fetch('/api/roasters', {})
    res = await res.json()
    dispatch(getRoastersAction(res));
    return res;
}

const reducer = (state = {}, { type, payload }) => {
    let stateCopy;
    switch (type) {
        case GET_ROASTERS:
            stateCopy = { ...state, ...payload }
            return state = stateCopy;
        default:
            return state;
    }
}

export default reducer;