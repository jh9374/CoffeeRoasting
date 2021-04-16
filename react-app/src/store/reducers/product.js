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
export const createProduct = (data) => async (dispatch) => {
    const form = new FormData();
    form.append("name",data.name);
    form.append("description",data.description);
    form.append("price",data.price);
    form.append("sweetness",data.sweetness);
    form.append("acidity",data.acidity);
    form.append("mouthfeel",data.mouthfeel);
    form.append("flavour-1",data.flavour1);
    form.append("flavour-2",data.flavour2);
    form.append("flavour-3",data.flavour3);
    form.append("flavour-4",data.flavour4);

    const files = data.files;

    const res = await fetch(`/api/products`, {
        method: "POST",
        body: form
    })

    let response = await res.json();
    console.log("response debugging",response)
    if ( files) {
        const form1 = new FormData();
        form1.append("files", files)
        form1.append("type_id",response.id)
        form1.append("type", "product")
        const res1 = await fetch(`/api/images`, {
            method: "POST",
            body: form1
        })
        const res2 = await res1
        console.log(res2);
    }

    // dispatch(createProductAction(name));

    return response;
}
export const getProduct= ({ id }) => async (dispatch) => {
    const res = await fetch(`/api/products/${id}`)
    return res.json();
}

export const getProducts= () => async (dispatch) => {
    let res = await fetch(`/api/products`)
    res = await res.json()
    await dispatch(getProductAction(res));
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