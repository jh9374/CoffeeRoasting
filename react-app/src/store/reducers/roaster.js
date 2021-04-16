// Action constants
const CREATE_ROASTER_PROFILE = "roaster/createUser";
const GET_ROASTER_PROFILE = "roaster/getUser";
const UPDATE_ROASTER_PROFILE = "roaster/updateUser";
const DELETE_ROASTER_PROFILE = "roaster/deleteUser";

// Action Creators
const createRoasterProfileAction = (payload) => ({
    type: CREATE_ROASTER_PROFILE,
    payload
});
const getRoasterProfileAction = (payload) => ({
    type: GET_ROASTER_PROFILE,
    payload
});
const updateRoasterProfileAction = (payload) => ({
    type: UPDATE_ROASTER_PROFILE,
    payload
});
const deleteRoasterProfileAction = (payload) => ({
    type: DELETE_ROASTER_PROFILE,
    payload
});
// Thunks
export const createRoaster = ({name}) => async (dispatch) => {
    const form = new FormData();
    form.append('name', name);

    const res = await fetch(`/api/roaster/`,{
        method: "POST",
        body: form
    })

    // dispatch(createRoasterProfileAction(name));

    return res.json();
}
export const getRoaster = ({id}) => async (dispatch) => {
    const res = await fetch(`/api/roaster/${id}`)
    
    // dispatch(getRoasterProfileAction(name));
    return res.json();
}
export const updateRoaster = ({name}) => async (dispatch) => {
    
    dispatch(updateRoasterProfileAction(name));
}
export const deleteRoaster = ({name}) => async (dispatch) => {
    
    dispatch(deleteRoasterProfileAction(name));
}
// State Template
const roasterTemplate = {
    id: null,
    name: null,
    userId: null,
    products: {},
    locations: {},
};

// Reducer
const reducer = (state = { roaster: roasterTemplate }, { type, payload }) => {
    let stateCopy;
    switch (type) {
        case CREATE_ROASTER_PROFILE:
            stateCopy = { roaster: { ...state.roaster, ...payload } };
            return state = stateCopy;
        case GET_ROASTER_PROFILE:
            stateCopy = { roaster: { ...state.roaster, ...payload } };
            return state = stateCopy;
        case UPDATE_ROASTER_PROFILE:
            stateCopy = { roaster: { ...state.roaster, ...payload } };
            return state = stateCopy;
        case DELETE_ROASTER_PROFILE:
            stateCopy = { roaster: { ...state.roaster, ...payload } };
            return state = stateCopy;
        default:
            return state;
    };
};

export default reducer;