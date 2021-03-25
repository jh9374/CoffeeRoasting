// Action constants
const CREATE_PRODUCT = "products/createProduct";
const GET_PRODUCTS = "products/getProducts";
// const GET_PRODUCT = "products/getProduct"
const UPDATE_PRODUCT = "products/updateProduct";
const DELETE_PRODUCT = "products/deleteProduct";

// Action Creators
const createProductAction = (payload) => ({
    type: CREATE_PRODUCT,
    payload
});
const getProductAction = (payload) => ({
    type: GET_PRODUCTS,
    payload
});
const updateProductAction = (payload) => ({
    type: UPDATE_PRODUCT,
    payload
});
const deleteProductAction = (payload) => ({
    type: DELETE_PRODUCT,
    payload
});
// Thunks
export const createProduct = ({ name }) => async (dispatch) => {
    const form = new FormData();
    form.append('name', name);

    const res = await fetch(`/api/products`, {
        method: "POST",
        body: form
    })

    dispatch(createProductAction(name));

    return res.json();
}
export const getProduct= ({ id }) => async (dispatch) => {
    const res = await fetch(`/api/products/${id}`)
    return res.json();
}

export const getProducts= () => async (dispatch) => {
    let res = await fetch(`/api/products`)
    res = await res.json()
    dispatch(getProductAction(res));
    return res;
}

export const updateProduct = ({ name }) => async (dispatch) => {

    dispatch(updateProductAction(name));
}

export const deleteProduct = ({ name }) => async (dispatch) => {

    dispatch(deleteProductAction(name));
}

// Reducer
const reducer = (state = { }, { type, payload }) => {
    let stateCopy;
    switch (type) {
        case CREATE_PRODUCT:
            stateCopy = { products: { ...state.products, ...payload } };
            return state = stateCopy;
        case GET_PRODUCTS:
            stateCopy = {   ...state.products, ...payload } ;
            return state = stateCopy;
        case UPDATE_PRODUCT:
            stateCopy = { products: { ...state.products, ...payload } };
            return state = stateCopy;
        case DELETE_PRODUCT:
            stateCopy = { products: { ...state.products, ...payload } };
            return state = stateCopy;
        default:
            return state;
    };
};

export default reducer;