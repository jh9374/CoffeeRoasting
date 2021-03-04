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
    email: null
};

// Thunks
export const setSessionUser = ({id, username, email}) => async (dispatch) => {
    dispatch(setSessionUserAction({id, username, email}));
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