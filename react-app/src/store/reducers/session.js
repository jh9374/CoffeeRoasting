// Action Constants
const SET_SESSION_USER = "session/setSessionUser";
const REMOVE_SESSION_USER = "session/removeSessionUser";

// Action Creators

const setSessionUserAction = (payload) => ({
    type: SET_SESSION_USER,
    payload,
});

const removeSessionUserAction = (payload) => ({
    type: REMOVE_SESSION_USER,
    payload
});

// State Template
const userTemplate = {
    id: null,
    username: null,
    email: null,
    bio: null,
    street_address: null,
    city: null,
    state: null,
    zipcode: null,
    roaster: false
};

// Thunks
export const setSessionUser = ({id, username, email, bio, street_address, city, state, zipcode, roaster}) => async (dispatch) => {
    dispatch(setSessionUserAction({id, username, email, bio, street_address, city, state, zipcode, roaster}));
    return;
};

export const removeSessionUser = () => async (dispatch) => {
    dispatch(removeSessionUserAction(userTemplate));
    return;
};

// Reducer

const reducer = (state={user: userTemplate}, {type, payload}) => {
    let stateCopy;
    switch(type) {
        case SET_SESSION_USER:
            stateCopy = {user: {...state.user, ...payload} };
            return state = stateCopy;
        case REMOVE_SESSION_USER:
            stateCopy = {user: {...state.user, ...payload} };
            return state = stateCopy;
        default:
            return state;
    };
};

export default reducer;